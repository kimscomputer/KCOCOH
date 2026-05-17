import { clearAdminSessionCookie, createAdminSessionCookie, json, passwordAuthConfigured, requireAdmin, verifyPassword } from '../../_shared/admin-auth.js';

export async function onRequestGet({ env, request }) {
  const auth = await requireAdmin(env, request);
  return json({
    ok: auth.ok,
    authenticated: auth.ok,
    loginUrl: '/admin/login/',
    passwordLoginConfigured: passwordAuthConfigured(env),
    identity: auth.ok ? { type: auth.identity.type, email: auth.identity.email || null, expiresAt: auth.identity.expiresAt || null } : null
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

  const password = body?.password;
  if (!(await verifyPassword(env, password))) {
    return json({ ok: false, error: '관리자 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  const cookie = await createAdminSessionCookie(env);
  return json({ ok: true, message: '관리자 로그인 완료', redirectTo: '/admin/' }, { headers: { 'set-cookie': cookie } });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, POST, OPTIONS' } });
}
