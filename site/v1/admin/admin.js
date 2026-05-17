(() => {
  const form = document.getElementById('adminForm');
  const status = document.getElementById('status');
  const saveBtn = document.getElementById('saveBtn');
  const exportBtn = document.getElementById('exportBtn');
  const previewBox = document.getElementById('previewBox');
  const backendFacts = document.getElementById('backendFacts');
  const photoList = document.getElementById('photoList');
  const bulletinList = document.getElementById('bulletinList');

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
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus('ok', '저장 완료', data.message || '관리 백엔드에 저장했습니다.');
      renderFacts(data);
    } catch (error) {
      setStatus('error', '저장하지 못했습니다', `${error.message}. Cloudflare Access와 D1/KV 저장소 연결이 필요할 수 있습니다.`);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = '변경 저장';
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

  const load = async () => {
    try {
      const res = await fetch('/api/admin/content', { headers: { accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
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
  };

  if (document.getElementById('bulletinDate')) document.getElementById('bulletinDate').valueAsDate = new Date();
  load();
})();
