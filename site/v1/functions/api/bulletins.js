const seedItems = [
  { id: 'seed-bulletin', title: { ko: '2026년 5월 17일 주보', en: 'May 17, 2026 Bulletin', zh: '2026年5月17日周报', es: 'Boletín del 17 de mayo de 2026' }, date: '2026-05-17', type: 'note', mime: 'text/plain', url: '', downloadUrl: '', summary: { ko: '관리 페이지에서 PDF 또는 이미지 주보를 올리면 주일예배 주보 뷰어와 다운로드 링크가 이 자리에 표시됩니다.', en: 'Upload a PDF or image bulletin from the admin page and the viewer and download link will appear here.' } }
];

const json = (body, init = {}) => new Response(JSON.stringify(body, null, 2), {
  ...init,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60, stale-while-revalidate=300', ...(init.headers || {}) }
});

const readItems = async (env) => {
  if (env.KCOC_CONTENT?.get) {
    const raw = await env.KCOC_CONTENT.get('bulletin-items');
    if (raw) return JSON.parse(raw);
  }
  if (env.DB?.prepare) {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS media_items (id TEXT PRIMARY KEY, kind TEXT NOT NULL, title TEXT, caption TEXT, url TEXT NOT NULL, download_url TEXT, mime TEXT, sort_order INTEGER, created_at TEXT NOT NULL)`).run();
    const { results } = await env.DB.prepare(`SELECT * FROM media_items WHERE kind = 'bulletin' ORDER BY sort_order ASC, created_at DESC`).all();
    if (results?.length) return results.map((row) => ({ id: row.id, title: JSON.parse(row.title || '{}'), date: row.caption || '', url: row.url, downloadUrl: row.download_url || row.url, mime: row.mime }));
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
