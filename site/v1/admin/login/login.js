(() => {
  const form = document.getElementById('loginForm');
  const password = document.getElementById('password');
  const button = document.getElementById('loginBtn');
  const status = document.getElementById('status');
  const params = new URLSearchParams(location.search);
  const next = params.get('next') || '/admin/';

  const setStatus = (kind, text) => {
    status.className = `status ${kind || ''}`.trim();
    status.textContent = text;
  };

  const checkExisting = async () => {
    try {
      const res = await fetch('/api/admin/auth', { headers: { accept: 'application/json' } });
      if (res.ok) {
        setStatus('ok', '이미 로그인되어 있습니다. 관리 페이지로 이동합니다.');
        location.replace(next);
      }
    } catch {
      // Keep the form available if the status request fails.
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = '확인 중...';
    setStatus('', '관리자 인증을 확인하고 있습니다.');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ password: password.value })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus('ok', data.message || '로그인되었습니다.');
      location.replace(next);
    } catch (error) {
      setStatus('error', error.message || '로그인하지 못했습니다.');
      password.select();
    } finally {
      button.disabled = false;
      button.textContent = '로그인';
    }
  });

  checkExisting();
})();
