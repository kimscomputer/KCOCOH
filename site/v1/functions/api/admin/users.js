import { adminUserStoreState, hashManagedPassword, json, readAdminUsers, requireAdmin, sanitizeAdminUser, unauthorizedJson, writeAdminUsers } from '../../_shared/admin-auth.js';

const normalizeUsername = (value) => String(value || '').trim().toLowerCase();
const cleanName = (value, fallback) => String(value || fallback || '').trim().slice(0, 80);
const cleanRole = (value) => (value === 'owner' ? 'owner' : 'editor');

const requireOwner = async (env, request) => {
  const auth = await requireAdmin(env, request);
  if (!auth.ok) return { error: unauthorizedJson(auth) };
  if ((auth.identity.role || 'editor') !== 'owner') {
    return { error: json({ ok: false, error: '관리자 계정 관리는 최고 관리자만 사용할 수 있습니다.' }, { status: 403 }) };
  }
  return { auth };
};

const listPayload = async (env, auth, extra = {}) => {
  const users = await readAdminUsers(env);
  return {
    ok: true,
    store: adminUserStoreState(env),
    writable: adminUserStoreState(env) !== 'not_configured',
    bootstrapAdmin: true,
    identity: {
      id: auth.identity.id || null,
      username: auth.identity.username || auth.identity.email || null,
      name: auth.identity.name || auth.identity.username || null,
      role: auth.identity.role || 'editor'
    },
    users: users.map(sanitizeAdminUser),
    ...extra
  };
};

export async function onRequestGet({ env, request }) {
  const owner = await requireOwner(env, request);
  if (owner.error) return owner.error;
  return json(await listPayload(env, owner.auth));
}

export async function onRequestPost({ env, request }) {
  const owner = await requireOwner(env, request);
  if (owner.error) return owner.error;
  if (adminUserStoreState(env) === 'not_configured') {
    return json({ ok: false, error: '관리자 목록 저장소가 아직 연결되지 않았습니다. KCOC_CONTENT KV 또는 DB 바인딩이 필요합니다.', store: 'not_configured' }, { status: 503 });
  }
  const body = await request.json().catch(() => null);
  const username = normalizeUsername(body?.username);
  const password = String(body?.password || '');
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(username)) return json({ ok: false, error: '관리자 아이디는 이메일 형식이어야 합니다.' }, { status: 400 });
  if (password.length < 10) return json({ ok: false, error: '비밀번호는 최소 10자 이상이어야 합니다.' }, { status: 400 });
  const users = await readAdminUsers(env);
  if (users.some((user) => normalizeUsername(user.username) === username)) return json({ ok: false, error: '이미 등록된 관리자입니다.' }, { status: 409 });
  const now = new Date().toISOString();
  const hashed = await hashManagedPassword(password);
  const user = {
    id: crypto.randomUUID(),
    username,
    name: cleanName(body?.name, username),
    role: cleanRole(body?.role),
    active: body?.active !== false,
    ...hashed,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null
  };
  const store = await writeAdminUsers(env, [...users, user]);
  return json(await listPayload(env, owner.auth, { message: '관리자를 추가했습니다.', store }));
}

export async function onRequestPut({ env, request }) {
  const owner = await requireOwner(env, request);
  if (owner.error) return owner.error;
  if (adminUserStoreState(env) === 'not_configured') return json({ ok: false, error: '관리자 목록 저장소가 아직 연결되지 않았습니다.', store: 'not_configured' }, { status: 503 });
  const body = await request.json().catch(() => null);
  const id = String(body?.id || '').trim();
  const users = await readAdminUsers(env);
  const current = users.find((user) => user.id === id);
  if (!current) return json({ ok: false, error: '관리자를 찾을 수 없습니다.' }, { status: 404 });
  const password = String(body?.password || '');
  const hashed = password ? await hashManagedPassword(password) : { passwordHash: current.passwordHash, salt: current.salt, algorithm: current.algorithm || 'sha256-salted-v1' };
  if (password && password.length < 10) return json({ ok: false, error: '새 비밀번호는 최소 10자 이상이어야 합니다.' }, { status: 400 });
  const updated = {
    ...current,
    name: cleanName(body?.name, current.name || current.username),
    role: cleanRole(body?.role || current.role),
    active: body?.active !== false,
    ...hashed,
    updatedAt: new Date().toISOString()
  };
  const store = await writeAdminUsers(env, users.map((user) => user.id === id ? updated : user));
  return json(await listPayload(env, owner.auth, { message: '관리자 정보를 저장했습니다.', store }));
}

export async function onRequestDelete({ env, request }) {
  const owner = await requireOwner(env, request);
  if (owner.error) return owner.error;
  if (adminUserStoreState(env) === 'not_configured') return json({ ok: false, error: '관리자 목록 저장소가 아직 연결되지 않았습니다.', store: 'not_configured' }, { status: 503 });
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const users = await readAdminUsers(env);
  if (!users.some((user) => user.id === id)) return json({ ok: false, error: '관리자를 찾을 수 없습니다.' }, { status: 404 });
  const store = await writeAdminUsers(env, users.filter((user) => user.id !== id));
  return json(await listPayload(env, owner.auth, { message: '관리자를 삭제했습니다.', store }));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, POST, PUT, DELETE, OPTIONS' } });
}
