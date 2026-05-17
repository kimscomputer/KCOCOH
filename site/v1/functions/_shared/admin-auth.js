const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

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

const base64urlText = (text) => btoa(String.fromCharCode(...textEncoder.encode(text)))
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/g, '');

const fromBase64urlText = (value) => {
  const base64 = String(value || '').replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(String(value || '').length / 4) * 4, '=');
  return textDecoder.decode(Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0)));
};

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

const normalizeUsername = (username) => String(username || '').trim().toLowerCase();

const getStore = (env) => {
  if (env.KCOC_CONTENT && typeof env.KCOC_CONTENT.get === 'function') return 'kv';
  if (env.DB && typeof env.DB.prepare === 'function') return 'd1';
  return null;
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
    id: email || 'cloudflare-access',
    username: email || 'cloudflare-access',
    name: email || 'Cloudflare Access',
    role: 'owner',
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

export const hashManagedPassword = async (password, salt = crypto.randomUUID()) => {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(`${salt}:${String(password || '')}`));
  return { salt, passwordHash: hex(digest), algorithm: 'sha256-salted-v1' };
};

export const verifyManagedPassword = async (admin, password) => {
  if (!admin?.passwordHash || !admin?.salt) return false;
  const hashed = await hashManagedPassword(password, admin.salt);
  return timingSafeEqual(hashed.passwordHash, admin.passwordHash);
};

export const sanitizeAdminUser = (admin) => ({
  id: admin.id,
  username: admin.username,
  name: admin.name || admin.username,
  role: admin.role || 'editor',
  active: admin.active !== false,
  createdAt: admin.createdAt || null,
  updatedAt: admin.updatedAt || null,
  lastLoginAt: admin.lastLoginAt || null
});

export const readAdminUsers = async (env) => {
  const store = getStore(env);
  if (store === 'kv') {
    const raw = await env.KCOC_CONTENT.get('admin-users');
    return raw ? JSON.parse(raw) : [];
  }
  if (store === 'd1') {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, name TEXT, role TEXT NOT NULL, active INTEGER NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, last_login_at TEXT)`).run();
    const { results } = await env.DB.prepare(`SELECT * FROM admin_users ORDER BY username ASC`).all();
    return (results || []).map((row) => ({
      id: row.id,
      username: row.username,
      name: row.name,
      role: row.role,
      active: row.active !== 0,
      passwordHash: row.password_hash,
      salt: row.salt,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastLoginAt: row.last_login_at
    }));
  }
  return [];
};

export const writeAdminUsers = async (env, users) => {
  const store = getStore(env);
  if (store === 'kv') {
    await env.KCOC_CONTENT.put('admin-users', JSON.stringify(users));
    return 'kv';
  }
  if (store === 'd1') {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, name TEXT, role TEXT NOT NULL, active INTEGER NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, last_login_at TEXT)`).run();
    for (const user of users) {
      await env.DB.prepare(`INSERT INTO admin_users (id, username, name, role, active, password_hash, salt, created_at, updated_at, last_login_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET username = excluded.username, name = excluded.name, role = excluded.role, active = excluded.active, password_hash = excluded.password_hash, salt = excluded.salt, updated_at = excluded.updated_at, last_login_at = excluded.last_login_at`).bind(user.id, user.username, user.name || user.username, user.role || 'editor', user.active === false ? 0 : 1, user.passwordHash, user.salt, user.createdAt, user.updatedAt, user.lastLoginAt || null).run();
    }
    return 'd1';
  }
  return null;
};

export const adminUserStoreState = (env) => getStore(env) || 'not_configured';

export const findAdminUser = async (env, username) => {
  const normalized = normalizeUsername(username);
  const users = await readAdminUsers(env);
  return users.find((user) => normalizeUsername(user.username) === normalized) || null;
};

export const authenticateManagedAdmin = async (env, username, password) => {
  const user = await findAdminUser(env, username);
  if (!user || user.active === false) return null;
  if (!(await verifyManagedPassword(user, password))) return null;
  const users = await readAdminUsers(env);
  const now = new Date().toISOString();
  const updated = users.map((item) => item.id === user.id ? { ...item, lastLoginAt: now, updatedAt: now } : item);
  await writeAdminUsers(env, updated);
  return { type: 'managed', id: user.id, username: user.username, name: user.name || user.username, role: user.role || 'editor', email: user.username, lastLoginAt: now };
};

export const createAdminSessionCookie = async (env, identity = {}) => {
  const cfg = adminAuthConfig(env);
  const issued = Math.floor(Date.now() / 1000);
  const expires = issued + cfg.maxAgeSeconds;
  const session = {
    issued,
    expires,
    type: identity.type || 'password',
    id: identity.id || identity.username || 'password-admin',
    username: identity.username || identity.email || 'password-admin',
    name: identity.name || identity.username || '초기 관리자',
    role: identity.role || 'owner'
  };
  const payload = base64urlText(JSON.stringify(session));
  const signature = await sign(cfg.sessionSecret, `v2.${payload}`);
  const value = encodeURIComponent(`v2.${payload}.${signature}`);
  return `${cfg.cookieName}=${value}; Path=/; Max-Age=${cfg.maxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`;
};

export const clearAdminSessionCookie = (env) => `${adminAuthConfig(env).cookieName}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

export const verifyAdminSession = async (env, request) => {
  const cfg = adminAuthConfig(env);
  if (!cfg.sessionSecret) return { authenticated: false, reason: 'session_secret_missing' };
  const value = getCookie(request, cfg.cookieName);
  const parts = value.split('.');
  if (parts[0] === 'v2' && parts.length === 3) {
    const [, payload, provided] = parts;
    const expected = await sign(cfg.sessionSecret, `v2.${payload}`);
    if (!timingSafeEqual(provided, expected)) return { authenticated: false, reason: 'session_bad_signature' };
    const session = JSON.parse(fromBase64urlText(payload));
    if (Number(session.expires) <= Math.floor(Date.now() / 1000)) return { authenticated: false, reason: 'session_expired' };
    return { authenticated: true, type: session.type || 'password', id: session.id, username: session.username, name: session.name, role: session.role || 'editor', email: session.username, expiresAt: session.expires };
  }
  if (parts.length !== 3) return { authenticated: false, reason: 'session_missing' };
  const [issued, expires, provided] = parts;
  const issuedAt = Number(issued);
  const expiresAt = Number(expires);
  if (!Number.isFinite(issuedAt) || !Number.isFinite(expiresAt)) return { authenticated: false, reason: 'session_invalid' };
  if (expiresAt <= Math.floor(Date.now() / 1000)) return { authenticated: false, reason: 'session_expired' };
  const expected = await sign(cfg.sessionSecret, `${issued}.${expires}`);
  if (!timingSafeEqual(provided, expected)) return { authenticated: false, reason: 'session_bad_signature' };
  return { authenticated: true, type: 'password', id: 'password-admin', username: 'password-admin', name: '초기 관리자', role: 'owner', email: 'password-admin', expiresAt };
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
