import { authenticateManagedAdmin, clearAdminSessionCookie, createAdminSessionCookie, json, passwordAuthConfigured, requireAdmin, verifyPassword } from '../../_shared/admin-auth.js';

export async function onRequestGet({ env, request }) {
  const auth = await requireAdmin(env, request);
  return json({
    ok: auth.ok,
    authenticated: auth.ok,
    loginUrl: '/admin/login/',
    passwordLoginConfigured: passwordAuthConfigured(env),
    identity: auth.ok ? {
      type: auth.identity.type,
      id: auth.identity.id || null,
      username: auth.identity.username || auth.identity.email || null,
      name: auth.identity.name || auth.identity.username || null,
      role: auth.identity.role || 'editor',
      email: auth.identity.email || null,
      expiresAt: auth.identity.expiresAt || null
    } : null
  }, { status: auth.ok ? 200 : 401 });
}

export async function onRequestPost({ env, request }) {
  const body = await request.json().catch(() => null);
  const action = body?.action || 'login';
  if (action === 'logout') {
    return json({ ok: true, message: '로그아웃했습니다.' }, { headers: { 'set-cookie': clearAdminSessionCookie(env) } });
  }

  if (!passwordAuthConfigured(env)) {
    return json({
      ok: false,
      error: '관리자 비밀번호 로그인이 아직 설정되지 않았습니다. Cloudflare Pages 환경변수 ADMIN_PASSWORD 또는 ADMIN_PASSWORD_SHA256, ADMIN_SESSION_SECRET을 설정해야 합니다.'
    }, { status: 503 });
  }

  const username = String(body?.username || '').trim();
  const password = body?.password;
  if (username) {
    const managed = await authenticateManagedAdmin(env, username, password);
    if (!managed) return json({ ok: false, error: '관리자 아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    const cookie = await createAdminSessionCookie(env, managed);
    return json({ ok: true, message: '관리자 로그인 완료', redirectTo: '/admin/', identity: managed }, { headers: { 'set-cookie': cookie } });
  }

  if (!(await verifyPassword(env, password))) {
    return json({ ok: false, error: '관리자 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  const bootstrapIdentity = { type: 'password', id: 'password-admin', username: 'password-admin', name: '초기 관리자', role: 'owner' };
  const cookie = await createAdminSessionCookie(env, bootstrapIdentity);
  return json({ ok: true, message: '관리자 로그인 완료', redirectTo: '/admin/', identity: bootstrapIdentity }, { headers: { 'set-cookie': cookie } });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, POST, OPTIONS' } });
}
