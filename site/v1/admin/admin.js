(() => {
  const form = document.getElementById('adminForm');
  const status = document.getElementById('status');
  const saveBtn = document.getElementById('saveBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const exportBtn = document.getElementById('exportBtn');
  const previewBox = document.getElementById('previewBox');
  const backendFacts = document.getElementById('backendFacts');
  const photoList = document.getElementById('photoList');
  const bulletinList = document.getElementById('bulletinList');
  const adminUsersList = document.getElementById('adminUsersList');
  let latestAdminUsers = [];

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  const setStatus = (kind, title, text) => {
    status.className = `status ${kind}`;
    status.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span>`;
  };

  const assignPath = (target, path, value) => {
    const parts = path.split('.');
    let cursor = target;
    parts.forEach((part, index) => {
      const last = index === parts.length - 1;
      const next = parts[index + 1];
      const key = /^\d+$/.test(part) ? Number(part) : part;
      if (last) {
        cursor[key] = value;
        return;
      }
      if (cursor[key] == null) cursor[key] = /^\d+$/.test(next) ? [] : {};
      cursor = cursor[key];
    });
  };

  const collect = () => {
    const payload = { updatedAt: new Date().toISOString() };
    new FormData(form).forEach((value, key) => assignPath(payload, key, value));
    return payload;
  };

  const fill = (data) => {
    if (!data || typeof data !== 'object') return;
    for (const input of form.elements) {
      if (!input.name) continue;
      const parts = input.name.split('.');
      let value = data;
      for (const part of parts) value = value?.[/^\d+$/.test(part) ? Number(part) : part];
      if (value != null) input.value = value;
    }
    renderPreview();
  };

  const renderPreview = () => {
    const data = collect();
    previewBox.innerHTML = `
      <strong>${escapeHtml(data.hero?.title?.ko || '')}</strong>
      <p>${escapeHtml(data.hero?.lead?.ko || '')}</p>
      <p class="muted" style="margin-top:10px">주일 장년예배: ${escapeHtml(data.services?.korean || '')} · 교회학교: ${escapeHtml(data.services?.children || '')}</p>
      <p class="muted">최근 소식: ${escapeHtml(data.news?.[0]?.title || '')}</p>
    `;
  };

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((btn) => btn.setAttribute('aria-selected', String(btn === tab)));
      document.querySelectorAll('[data-pane]').forEach((pane) => pane.classList.toggle('hidden', pane.dataset.pane !== tab.dataset.section));
    });
  });

  form.addEventListener('input', renderPreview);

  exportBtn.addEventListener('click', async () => {
    const text = JSON.stringify(collect(), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setStatus('ok', 'JSON 복사 완료', '현재 입력값을 클립보드에 복사했습니다. 저장은 별도로 변경 저장 버튼을 눌러야 합니다.');
    } catch {
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), { href: url, download: 'kcoc-admin-content.json' });
      a.click();
      URL.revokeObjectURL(url);
      setStatus('ok', 'JSON 다운로드 준비', '클립보드 권한이 없어 JSON 파일로 내려받았습니다.');
    }
  });

  const renderFacts = (data) => {
    if (!backendFacts) return;
    const facts = [
      ['API 상태', data.ok ? '정상 응답' : '확인 필요'],
      ['저장소', data.store || '미연결'],
      ['Access 보호', data.access || '설정 필요'],
      ['공개 반영', data.publicReflection || '공개 API 준비됨']
    ];
    backendFacts.innerHTML = facts.map(([k, v]) => `<div class="item"><strong>${escapeHtml(k)}</strong><p>${escapeHtml(v)}</p></div>`).join('');
  };

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = '저장 중...';
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(collect())
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) location.replace(data.loginUrl || '/admin/login/');
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus('ok', '저장 완료', data.message || '관리 백엔드에 저장했습니다.');
      if (data.content) fill(data.content);
      renderFacts(data);
    } catch (error) {
      setStatus('error', '저장하지 못했습니다', `${error.message}. Cloudflare Access와 D1/KV 저장소 연결이 필요할 수 있습니다.`);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = '변경 저장';
    }
  });

  logoutBtn?.addEventListener('click', async () => {
    logoutBtn.disabled = true;
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
    } finally {
      location.replace('/admin/login/');
    }
  });

  const fileToPayload = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      data: String(reader.result || '').split(',')[1] || ''
    });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const uploadJson = async (url, payload) => {
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  };

  const renderPhotos = (items = []) => {
    if (!photoList) return;
    if (!items.length) {
      photoList.innerHTML = '<div class="item"><strong>사진 없음</strong><p>사진을 업로드하면 이곳에 목록이 표시됩니다.</p></div>';
      return;
    }
    photoList.innerHTML = items.map((item) => `<article class="media-card"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.title?.ko || item.title || '교회 사진')}"><div><strong>${escapeHtml(item.title?.ko || item.title || '교회 사진')}</strong><p class="muted">${escapeHtml(item.caption?.ko || item.caption || '')}</p></div></article>`).join('');
  };

  const renderBulletins = (items = []) => {
    if (!bulletinList) return;
    if (!items.length) {
      bulletinList.innerHTML = '<div class="item"><strong>주보 없음</strong><p>PDF 또는 이미지 주보를 업로드하면 이곳에 목록이 표시됩니다.</p></div>';
      return;
    }
    bulletinList.innerHTML = items.map((item) => `<div class="item"><strong>${escapeHtml(item.title?.ko || item.title || '주보')}</strong><p>${escapeHtml(item.date || '')} · ${escapeHtml(item.mime || item.type || '')}</p>${item.url ? `<div class="mini-actions"><a class="btn" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">보기</a><a class="btn" href="${escapeHtml(item.downloadUrl || item.url)}" download>다운로드</a></div>` : ''}</div>`).join('');
  };

  const refreshPhotos = async () => {
    try {
      const res = await fetch('/api/media/gallery', { headers: { accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      renderPhotos(Array.isArray(data.items) ? data.items : []);
    } catch { renderPhotos([]); }
  };

  const refreshBulletins = async () => {
    try {
      const res = await fetch('/api/bulletins', { headers: { accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      renderBulletins(Array.isArray(data.items) ? data.items : []);
    } catch { renderBulletins([]); }
  };

  const renderAdminUsers = (data = {}) => {
    if (!adminUsersList) return;
    const users = Array.isArray(data.users) ? data.users : [];
    latestAdminUsers = users;
    const intro = data.writable
      ? `<div class="item"><strong>관리자 저장소 연결됨</strong><p>등록된 관리자는 이메일 아이디와 비밀번호로 로그인할 수 있습니다. 현재 로그인: ${escapeHtml(data.identity?.name || data.identity?.username || '관리자')}</p></div>`
      : '<div class="item"><strong>관리자 저장소 필요</strong><p>KCOC_CONTENT KV 또는 DB 바인딩이 연결되면 관리자 추가/수정/삭제가 활성화됩니다. 현재는 초기 관리자 비밀번호로만 로그인할 수 있습니다.</p></div>';
    const bootstrap = '<div class="admin-user-card"><div><strong>초기 관리자</strong><p class="muted">환경변수 ADMIN_PASSWORD 기반 백업 로그인</p></div><span class="badge">OWNER</span></div>';
    const cards = users.map((user) => `
      <div class="admin-user-card" data-admin-id="${escapeHtml(user.id)}">
        <div>
          <strong>${escapeHtml(user.name || user.username)}</strong>
          <p class="muted">${escapeHtml(user.username)} · ${escapeHtml(user.active ? '활성' : '비활성')} · 마지막 로그인 ${escapeHtml(user.lastLoginAt || '없음')}</p>
        </div>
        <div class="mini-actions">
          <span class="badge">${escapeHtml((user.role || 'editor').toUpperCase())}</span>
          <button class="btn" type="button" data-admin-toggle="${escapeHtml(user.id)}">${user.active ? '비활성화' : '활성화'}</button>
          <button class="btn" type="button" data-admin-reset="${escapeHtml(user.id)}">비밀번호 변경</button>
          <button class="btn danger" type="button" data-admin-delete="${escapeHtml(user.id)}">삭제</button>
        </div>
      </div>`).join('');
    adminUsersList.innerHTML = intro + bootstrap + (cards || '<div class="item"><strong>추가 관리자 없음</strong><p>위 양식에서 관리자를 추가하세요.</p></div>');
  };

  const refreshAdmins = async () => {
    if (!adminUsersList) return;
    try {
      const res = await fetch('/api/admin/users', { headers: { accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return location.replace(data.loginUrl || '/admin/login/');
      if (res.status === 403) return renderAdminUsers({ writable: false, users: [], identity: data.identity, message: data.error });
      renderAdminUsers(data);
    } catch {
      renderAdminUsers({ writable: false, users: [] });
    }
  };

  const adminPayload = () => ({
    name: document.getElementById('adminName')?.value || '',
    username: document.getElementById('adminUsername')?.value || '',
    role: document.getElementById('adminRole')?.value || 'editor',
    password: document.getElementById('adminPassword')?.value || ''
  });

  const saveAdminUser = async (method, payload, successTitle) => {
    const res = await fetch('/api/admin/users', {
      method,
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) return location.replace(data.loginUrl || '/admin/login/');
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    renderAdminUsers(data);
    setStatus('ok', successTitle, data.message || '관리자 계정 정보를 저장했습니다.');
    return data;
  };

  document.getElementById('uploadPhotoBtn')?.addEventListener('click', async () => {
    const file = document.getElementById('photoFile')?.files?.[0];
    if (!file) return setStatus('warn', '사진 파일 필요', '업로드할 사진을 먼저 선택해 주세요.');
    try {
      setStatus('warn', '사진 업로드 중', '선택한 사진을 서버 저장소로 전송하고 있습니다.');
      const uploaded = await uploadJson('/api/admin/media', {
        file: await fileToPayload(file),
        title: { ko: document.getElementById('photoTitleKo').value, en: document.getElementById('photoTitleEn').value },
        caption: { ko: document.getElementById('photoCaptionKo').value, en: document.getElementById('photoCaptionKo').value }
      });
      setStatus('ok', '사진 업로드 완료', uploaded.message || '사진이 갤러리에 저장되었습니다.');
      renderPhotos(uploaded.items || []);
    } catch (error) {
      setStatus('error', '사진 업로드 실패', `${error.message}. R2/KV/D1 저장소 바인딩과 Access 설정을 확인해야 합니다.`);
      const local = URL.createObjectURL(file);
      renderPhotos([{ url: local, title: { ko: document.getElementById('photoTitleKo').value }, caption: { ko: '로컬 미리보기입니다. 서버에는 저장되지 않았습니다.' } }]);
    }
  });

  document.getElementById('uploadBulletinBtn')?.addEventListener('click', async () => {
    const file = document.getElementById('bulletinFile')?.files?.[0];
    if (!file) return setStatus('warn', '주보 파일 필요', '업로드할 PDF 또는 이미지 주보를 먼저 선택해 주세요.');
    try {
      setStatus('warn', '주보 업로드 중', '선택한 주보 파일을 서버 저장소로 전송하고 있습니다.');
      const uploaded = await uploadJson('/api/admin/bulletins', {
        file: await fileToPayload(file),
        date: document.getElementById('bulletinDate').value,
        title: { ko: document.getElementById('bulletinTitleKo').value, en: document.getElementById('bulletinTitleEn').value }
      });
      setStatus('ok', '주보 업로드 완료', uploaded.message || '주보가 저장되었습니다.');
      renderBulletins(uploaded.items || []);
    } catch (error) {
      setStatus('error', '주보 업로드 실패', `${error.message}. R2/KV/D1 저장소 바인딩과 Access 설정을 확인해야 합니다.`);
    }
  });

  document.getElementById('refreshPhotosBtn')?.addEventListener('click', refreshPhotos);
  document.getElementById('refreshBulletinsBtn')?.addEventListener('click', refreshBulletins);
  document.getElementById('refreshAdminsBtn')?.addEventListener('click', refreshAdmins);
  document.getElementById('addAdminBtn')?.addEventListener('click', async () => {
    try {
      await saveAdminUser('POST', adminPayload(), '관리자 추가 완료');
      const passwordInput = document.getElementById('adminPassword');
      if (passwordInput) passwordInput.value = '';
    } catch (error) {
      setStatus('error', '관리자 추가 실패', error.message);
    }
  });
  adminUsersList?.addEventListener('click', async (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    const id = target.dataset.adminToggle || target.dataset.adminReset || target.dataset.adminDelete;
    if (!id) return;
    const user = latestAdminUsers.find((item) => item.id === id);
    if (!user) return setStatus('error', '관리자 확인 실패', '선택한 관리자를 찾을 수 없습니다.');
    try {
      if (target.dataset.adminDelete) {
        if (!confirm(`${user.name || user.username} 관리자를 삭제할까요?`)) return;
        const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: { accept: 'application/json' } });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) return location.replace(data.loginUrl || '/admin/login/');
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        renderAdminUsers(data);
        return setStatus('ok', '관리자 삭제 완료', data.message || '관리자를 삭제했습니다.');
      }
      if (target.dataset.adminReset) {
        const password = prompt(`${user.name || user.username}의 새 비밀번호를 입력하세요. 최소 10자입니다.`);
        if (!password) return;
        await saveAdminUser('PUT', { id, name: user.name, role: user.role, active: user.active, password }, '비밀번호 변경 완료');
        return;
      }
      await saveAdminUser('PUT', { id, name: user.name, role: user.role, active: !user.active }, user.active ? '관리자 비활성화 완료' : '관리자 활성화 완료');
    } catch (error) {
      setStatus('error', '관리자 저장 실패', error.message);
    }
  });

  const load = async () => {
    try {
      const res = await fetch('/api/admin/content', { headers: { accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        location.replace(data.loginUrl || '/admin/login/');
        return;
      }
      if (data.content) fill(data.content);
      renderFacts(data);
      if (res.ok && !data.configRequired) setStatus('ok', '관리 백엔드 연결됨', data.message || '콘텐츠를 불러왔습니다.');
      else setStatus('warn', '관리 화면 준비됨', data.message || '관리 UI는 준비됐고, 실제 저장은 Cloudflare Access와 저장소 연결 후 활성화됩니다.');
    } catch {
      setStatus('warn', '정적 관리 화면으로 열림', '현재 배포에는 /api/admin/content 백엔드가 아직 응답하지 않습니다. UI와 API 코드는 함께 준비되어 있습니다.');
    }
    renderPreview();
    refreshPhotos();
    refreshBulletins();
    refreshAdmins();
  };

  if (document.getElementById('bulletinDate')) document.getElementById('bulletinDate').valueAsDate = new Date();
  load();
})();
