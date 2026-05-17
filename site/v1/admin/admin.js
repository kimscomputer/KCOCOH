(() => {
  const form = document.getElementById('adminForm');
  const status = document.getElementById('status');
  const saveBtn = document.getElementById('saveBtn');
  const exportBtn = document.getElementById('exportBtn');
  const previewBox = document.getElementById('previewBox');
  const backendFacts = document.getElementById('backendFacts');

  const setStatus = (kind, title, text) => {
    status.className = `status ${kind}`;
    status.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span>`;
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

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
      setStatus('ok', 'JSON 복사 완료', '현재 입력값을 클립보드에 복사했습니다.');
    } catch {
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), { href: url, download: 'kcoc-admin-content.json' });
      a.click();
      URL.revokeObjectURL(url);
      setStatus('ok', 'JSON 다운로드 준비', '클립보드 권한이 없어 JSON 파일로 내려받았습니다.');
    }
  });

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

  const renderFacts = (data) => {
    if (!backendFacts) return;
    const facts = [
      ['API 상태', data.ok ? '정상 응답' : '확인 필요'],
      ['저장소', data.store || '미연결'],
      ['Access 보호', data.access || '설정 필요'],
      ['공개 반영', data.publicReflection || '다음 단계에서 홈페이지 연동']
    ];
    backendFacts.innerHTML = facts.map(([k, v]) => `<div class="item"><strong>${escapeHtml(k)}</strong><p>${escapeHtml(v)}</p></div>`).join('');
  };

  const load = async () => {
    try {
      const res = await fetch('/api/admin/content', { headers: { accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (data.content) fill(data.content);
      renderFacts(data);
      if (res.ok && !data.configRequired) setStatus('ok', '관리 백엔드 연결됨', data.message || '콘텐츠를 불러왔습니다.');
      else setStatus('warn', '관리 화면 준비됨', data.message || '관리 UI는 준비됐고, 실제 저장은 Cloudflare Access와 저장소 연결 후 활성화됩니다.');
    } catch (error) {
      setStatus('warn', '정적 관리 화면으로 열림', '현재 배포에는 /api/admin/content 백엔드가 아직 응답하지 않습니다. UI와 API 코드는 함께 준비되어 있습니다.');
    }
    renderPreview();
  };

  load();
})();
