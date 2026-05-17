import { accessIdentity, json, requireAdmin, unauthorizedJson } from '../../_shared/admin-auth.js';

const accessState = (env, request) => {
  const access = accessIdentity(env, request);
  return { enforced: access.enforced, email: access.email, hasJwt: access.hasJwt, emailAllowed: access.emailAllowed };
};

const decodeBase64 = (data) => Uint8Array.from(atob(data), (ch) => ch.charCodeAt(0));
const slug = (name) => String(name || 'upload').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'upload';
const publicUrl = (env, key) => {
  const base = String(env.KCOC_MEDIA_PUBLIC_URL || '').replace(/\/$/, '');
  return base ? `${base}/${key}` : `/media-upload-placeholder/${key}`;
};

const readItems = async (env) => {
  if (env.KCOC_CONTENT?.get) {
    const raw = await env.KCOC_CONTENT.get('gallery-items');
    return raw ? JSON.parse(raw) : [];
  }
  if (env.DB?.prepare) {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS media_items (id TEXT PRIMARY KEY, kind TEXT NOT NULL, title TEXT, caption TEXT, url TEXT NOT NULL, download_url TEXT, mime TEXT, sort_order INTEGER, created_at TEXT NOT NULL)`).run();
    const { results } = await env.DB.prepare(`SELECT * FROM media_items WHERE kind = 'photo' ORDER BY sort_order ASC, created_at DESC`).all();
    return (results || []).map((row) => ({ id: row.id, title: JSON.parse(row.title || '{}'), caption: JSON.parse(row.caption || '{}'), url: row.url, mime: row.mime }));
  }
  return [];
};

const saveItem = async (env, item) => {
  if (env.KCOC_CONTENT?.put) {
    const items = await readItems(env);
    items.unshift(item);
    await env.KCOC_CONTENT.put('gallery-items', JSON.stringify(items.slice(0, 80)));
    return items.slice(0, 80);
  }
  if (env.DB?.prepare) {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS media_items (id TEXT PRIMARY KEY, kind TEXT NOT NULL, title TEXT, caption TEXT, url TEXT NOT NULL, download_url TEXT, mime TEXT, sort_order INTEGER, created_at TEXT NOT NULL)`).run();
    await env.DB.prepare(`INSERT INTO media_items (id, kind, title, caption, url, download_url, mime, sort_order, created_at) VALUES (?, 'photo', ?, ?, ?, ?, ?, ?, ?)`).bind(item.id, JSON.stringify(item.title || {}), JSON.stringify(item.caption || {}), item.url, item.url, item.mime || '', 0, item.createdAt).run();
    return readItems(env);
  }
  return null;
};

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin.ok) return unauthorizedJson(admin);
  if (!env.KCOC_MEDIA?.put) return json({ ok: false, error: 'KCOC_MEDIA R2 bucket binding is required before photo upload is enabled.' }, { status: 503 });
  const payload = await request.json().catch(() => null);
  if (!payload?.file?.data || !payload?.file?.type?.startsWith('image/')) return json({ ok: false, error: 'Valid image file payload is required.' }, { status: 400 });
  if (payload.file.size > 8 * 1024 * 1024) return json({ ok: false, error: 'Photo file is too large. Please keep it under 8MB.' }, { status: 413 });
  const id = crypto.randomUUID();
  const key = `photos/${new Date().toISOString().slice(0, 10)}/${id}-${slug(payload.file.name)}`;
  await env.KCOC_MEDIA.put(key, decodeBase64(payload.file.data), { httpMetadata: { contentType: payload.file.type } });
  const item = { id, title: payload.title || { ko: '교회 사진', en: 'Church Photo' }, caption: payload.caption || {}, url: publicUrl(env, key), mime: payload.file.type, createdAt: new Date().toISOString() };
  const items = await saveItem(env, item);
  if (!items) return json({ ok: false, error: 'KCOC_CONTENT KV or DB binding is required to save gallery metadata.' }, { status: 503 });
  return json({ ok: true, message: '사진을 업로드하고 공개 갤러리 목록에 저장했습니다.', item, items });
}

export async function onRequestGet({ env, request }) {
  const access = accessState(env, request);
  return json({
    ok: true,
    feature: 'photo-upload',
    ready: Boolean(env.KCOC_MEDIA?.put && (env.KCOC_CONTENT?.put || env.DB?.prepare) && access.enforced),
    access: access.enforced ? 'enforced' : 'not_enforced_yet',
    mediaStore: env.KCOC_MEDIA?.put ? 'r2_configured' : 'r2_not_configured',
    metadataStore: env.KCOC_CONTENT?.put ? 'kv_configured' : env.DB?.prepare ? 'd1_configured' : 'not_configured',
    message: '사진 업로드 API는 배포됐습니다. 실제 저장은 Cloudflare Access, R2 KCOC_MEDIA, KV KCOC_CONTENT 또는 D1 DB 바인딩 연결 후 활성화됩니다.'
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, POST, OPTIONS' } });
}
