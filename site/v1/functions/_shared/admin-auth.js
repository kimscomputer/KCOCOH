const textEncoder = new TextEncoder();

const json = (body, init = {}) => new Response(JSON.stringify(body, null, 2), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'private, no-store',
    ...(init.headers || {})
  }
});

const base64url = (buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer)))
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/g, '');

const hex = (buffer) => [...new Uint8Array(buffer)]
  .map((byte) => byte.toString(16).padStart(2, '0'))
  .join('');

const timingSafeEqual = (a, b) => {
  const left = textEncoder.encode(String(a || ''));
  const right = textEncoder.encode(String(b || ''));
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left[i] ^ right[i];
  return diff === 0;
};

const importHmacKey = (secret) => crypto.subtle.importKey(
  'raw',
  textEncoder.encode(secret),
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['sign', 'verify']
);

const sign = async (secret, payload) => {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(payload));
  return base64url(signature);
};

const getCookie = (request, name) => {
  const cookie = request.headers.get('Cookie') || '';
  const found = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
  if (!found) return '';
  return decodeURIComponent(found.slice(name.length + 1));
};

export const adminAuthConfig = (env) => ({
  cookieName: env.ADMIN_SESSION_COOKIE || 'kcoc_admin',
  password: env.ADMIN_PASSWORD || '',
  passwordHash: String(env.ADMIN_PASSWORD_SHA256 || '').trim().toLowerCase(),
  sessionSecret: env.ADMIN_SESSION_SECRET || '',
  maxAgeSeconds: Math.max(900, Number(env.ADMIN_SESSION_MAX_AGE || 21600) || 21600),
  accessEnforced: env.ADMIN_ACCESS_ENFORCED === 'true',
  allowedEmails: String(env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
});

export const accessIdentity = (env, request) => {
  const cfg = adminAuthConfig(env);
  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || '';
  const hasJwt = Boolean(request.headers.get('Cf-Access-Jwt-Assertion'));
  const emailAllowed = Boolean(email) && (cfg.allowedEmails.length === 0 || cfg.allowedEmails.includes(email.toLowerCase()));
  return {
    type: 'access',
    authenticated: cfg.accessEnforced && hasJwt && emailAllowed,
    email,
    hasJwt,
    emailAllowed,
    enforced: cfg.accessEnforced,
    allowed: cfg.allowedEmails
  };
};

export const verifyPassword = async (env, password) => {
  const cfg = adminAuthConfig(env);
  const submitted = String(password || '');
  if (cfg.passwordHash) {
    const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(submitted));
    return timingSafeEqual(hex(digest), cfg.passwordHash);
  }
  if (cfg.password) return timingSafeEqual(submitted, cfg.password);
  return false;
};

export const passwordAuthConfigured = (env) => {
  const cfg = adminAuthConfig(env);
  return Boolean((cfg.password || cfg.passwordHash) && cfg.sessionSecret);
};

export const createAdminSessionCookie = async (env) => {
  const cfg = adminAuthConfig(env);
  const issued = Math.floor(Date.now() / 1000);
  const expires = issued + cfg.maxAgeSeconds;
  const payload = `${issued}.${expires}`;
  const signature = await sign(cfg.sessionSecret, payload);
  const value = encodeURIComponent(`${payload}.${signature}`);
  return `${cfg.cookieName}=${value}; Path=/; Max-Age=${cfg.maxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`;
};

export const clearAdminSessionCookie = (env) => `${adminAuthConfig(env).cookieName}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

export const verifyAdminSession = async (env, request) => {
  const cfg = adminAuthConfig(env);
  if (!cfg.sessionSecret) return { authenticated: false, reason: 'session_secret_missing' };
  const value = getCookie(request, cfg.cookieName);
  const parts = value.split('.');
  if (parts.length !== 3) return { authenticated: false, reason: 'session_missing' };
  const [issued, expires, provided] = parts;
  const issuedAt = Number(issued);
  const expiresAt = Number(expires);
  if (!Number.isFinite(issuedAt) || !Number.isFinite(expiresAt)) return { authenticated: false, reason: 'session_invalid' };
  if (expiresAt <= Math.floor(Date.now() / 1000)) return { authenticated: false, reason: 'session_expired' };
  const expected = await sign(cfg.sessionSecret, `${issued}.${expires}`);
  if (!timingSafeEqual(provided, expected)) return { authenticated: false, reason: 'session_bad_signature' };
  return { authenticated: true, type: 'password', email: 'password-admin', expiresAt };
};

export const requireAdmin = async (env, request) => {
  const access = accessIdentity(env, request);
  if (access.authenticated) return { ok: true, identity: access };
  const session = await verifyAdminSession(env, request);
  if (session.authenticated) return { ok: true, identity: session };
  return { ok: false, access, session };
};

export const unauthorizedJson = (auth, status = 401) => json({
  ok: false,
  error: '관리자 로그인이 필요합니다.',
  loginUrl: '/admin/login/',
  access: auth?.access?.enforced ? 'Cloudflare Access required' : 'password_login_required',
  reason: auth?.session?.reason || 'not_authenticated'
}, { status });

export { json };
