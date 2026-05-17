const seedContent = {
  hero: {
    title: {
      ko: '예수 그리스도의 사랑으로 여러분을 환영합니다',
      en: 'Welcome in the love of Jesus Christ'
    },
    lead: {
      ko: '콜럼버스 한인교회는 말씀과 성령 안에서 예배하고, 성도를 세우며, 한 영혼과 다음 세대를 복음으로 섬기는 믿음의 공동체입니다.',
      en: 'Korean Church of Columbus is a gospel community worshiping in the Word and Spirit, building up believers, and serving one soul and the next generation in Christ.'
    }
  },
  services: {
    korean: '9:00 / 11:00 AM',
    english: '9:00 / 11:00 AM',
    children: '11:00 AM',
    midweek: '7:00 PM',
    dawn: '6:00 AM',
    youth: 'Friday 7:00 PM'
  },
  news: [
    { label: 'Bulletin', title: '2026년 5월 17일 주보 정보 반영' },
    { label: 'Sermon', title: '사랑의 복음이 충만한 가정' },
    { label: 'Reading', title: '에베소서 5:21–28' }
  ],
  contact: {
    address: '2825 Snouffer Rd, Columbus, OH 43235',
    phone: '(614) 726-1022',
    email: 'help@mykoreanchurch.org'
  }
};

const json = (body, init = {}) => new Response(JSON.stringify(body, null, 2), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'private, no-store',
    ...(init.headers || {})
  }
});

const accessState = (env, request) => {
  const enforced = env.ADMIN_ACCESS_ENFORCED === 'true';
  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || '';
  const hasJwt = Boolean(request.headers.get('Cf-Access-Jwt-Assertion'));
  const allowed = String(env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const emailAllowed = Boolean(email) && (allowed.length === 0 || allowed.includes(email.toLowerCase()));
  return { enforced, email, hasJwt, emailAllowed, allowed };
};

const getStore = (env) => {
  if (env.KCOC_CONTENT && typeof env.KCOC_CONTENT.get === 'function') return 'kv';
  if (env.DB && typeof env.DB.prepare === 'function') return 'd1';
  return null;
};

const readContent = async (env) => {
  const store = getStore(env);
  if (store === 'kv') {
    const raw = await env.KCOC_CONTENT.get('site-content');
    return raw ? JSON.parse(raw) : seedContent;
  }
  if (store === 'd1') {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS site_content (content_key TEXT PRIMARY KEY, body TEXT NOT NULL, updated_at TEXT NOT NULL)`).run();
    const row = await env.DB.prepare(`SELECT body FROM site_content WHERE content_key = ?`).bind('homepage').first();
    return row?.body ? JSON.parse(row.body) : seedContent;
  }
  return seedContent;
};

const writeContent = async (env, payload) => {
  const store = getStore(env);
  const body = JSON.stringify(payload);
  const updated = new Date().toISOString();
  if (store === 'kv') {
    await env.KCOC_CONTENT.put('site-content', body);
    return 'kv';
  }
  if (store === 'd1') {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS site_content (content_key TEXT PRIMARY KEY, body TEXT NOT NULL, updated_at TEXT NOT NULL)`).run();
    await env.DB.prepare(`INSERT INTO site_content (content_key, body, updated_at) VALUES (?, ?, ?) ON CONFLICT(content_key) DO UPDATE SET body = excluded.body, updated_at = excluded.updated_at`).bind('homepage', body, updated).run();
    return 'd1';
  }
  return null;
};

export async function onRequestGet({ env, request }) {
  const store = getStore(env);
  const access = accessState(env, request);
  const content = await readContent(env);
  return json({
    ok: true,
    configRequired: !store,
    message: store
      ? '관리 콘텐츠를 불러왔습니다.'
      : '관리 UI와 API는 배포됐지만 D1 또는 KV 저장소 바인딩이 아직 연결되지 않았습니다.',
    store: store || 'not_configured',
    access: access.enforced ? 'Cloudflare Access required' : 'not_enforced_yet',
    publicReflection: 'prepared; homepage dynamic reflection can be enabled after storage binding is confirmed',
    content
  });
}

export async function onRequestPut({ env, request }) {
  const access = accessState(env, request);
  if (!access.enforced) {
    return json({ ok: false, error: 'ADMIN_ACCESS_ENFORCED must be true before remote admin writes are enabled.' }, { status: 503 });
  }
  if (!access.hasJwt || !access.emailAllowed) {
    return json({ ok: false, error: 'Cloudflare Access admin session is required.' }, { status: 401 });
  }
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== 'object') return json({ ok: false, error: 'Invalid JSON payload.' }, { status: 400 });
  const store = await writeContent(env, { ...payload, updatedAt: new Date().toISOString(), updatedBy: access.email });
  if (!store) return json({ ok: false, error: 'No D1 DB or KCOC_CONTENT KV binding is configured.' }, { status: 503 });
  return json({ ok: true, message: '관리 콘텐츠를 저장했습니다.', store, access: access.email, publicReflection: 'saved; public homepage reflection is the next integration step' });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'allow': 'GET, PUT, OPTIONS' } });
}
