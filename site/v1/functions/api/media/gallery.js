const seedItems = [
  { id: 'seed-1', title: { ko: '예배와 교제', en: 'Worship and Community', zh: '敬拜与共同体', es: 'Culto y comunidad' }, caption: { ko: '교회 사진을 업로드하면 이 영역에 정돈된 갤러리로 표시됩니다.', en: 'Uploaded church photos appear here in a balanced gallery.' }, url: '/media/existing-home/DSCF9332-1500x630.jpg' },
  { id: 'seed-2', title: { ko: '말씀과 찬양', en: 'Word and Praise', zh: '话语与赞美', es: 'Palabra y alabanza' }, caption: { ko: '예배의 은혜를 사진으로 나눕니다.', en: 'Sharing the grace of worship through photos.' }, url: '/media/existing-home/XE1A9331-1-1500x630.jpg' },
  { id: 'seed-3', title: { ko: '사랑의 교제', en: 'Fellowship', zh: '团契', es: 'Comunión' }, caption: { ko: '주의 사랑 안에서 서로를 세워갑니다.', en: 'Building one another up in the love of Christ.' }, url: '/media/existing-home/DSCF2315-1500x630.jpg' },
  { id: 'seed-4', title: { ko: '다음세대', en: 'Next Generation', zh: '下一代', es: 'Próxima generación' }, caption: { ko: '다음세대를 말씀 안에서 세웁니다.', en: 'Raising the next generation in the Word.' }, url: '/media/existing-home/VL6D2190-3-1500x630.jpg' }
];

const json = (body, init = {}) => new Response(JSON.stringify(body, null, 2), {
  ...init,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60, stale-while-revalidate=300', ...(init.headers || {}) }
});

const readItems = async (env) => {
  if (env.KCOC_CONTENT?.get) {
    const raw = await env.KCOC_CONTENT.get('gallery-items');
    if (raw) return JSON.parse(raw);
  }
  if (env.DB?.prepare) {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS media_items (id TEXT PRIMARY KEY, kind TEXT NOT NULL, title TEXT, caption TEXT, url TEXT NOT NULL, download_url TEXT, mime TEXT, sort_order INTEGER, created_at TEXT NOT NULL)`).run();
    const { results } = await env.DB.prepare(`SELECT * FROM media_items WHERE kind = 'photo' ORDER BY sort_order ASC, created_at DESC`).all();
    if (results?.length) return results.map((row) => ({ id: row.id, title: JSON.parse(row.title || '{}'), caption: JSON.parse(row.caption || '{}'), url: row.url, mime: row.mime }));
  }
  return seedItems;
};

export async function onRequestGet({ env }) {
  const items = await readItems(env).catch(() => seedItems);
  return json({ ok: true, items, fallback: items === seedItems });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, OPTIONS' } });
}
