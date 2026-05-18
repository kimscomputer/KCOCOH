import { json, requireAdmin, unauthorizedJson, accessIdentity } from '../../_shared/admin-auth.js';

const seedContent = {
  hero: {
    title: {
      ko: '예수 그리스도의 사랑으로 여러분을 환영합니다',
      en: 'Welcome in the love of Jesus Christ',
      zh: '在耶稣基督的爱中欢迎您',
      es: 'Bienvenido en el amor de Jesucristo'
    },
    lead: {
      ko: '콜럼버스 한인교회는 말씀과 성령 안에서 예배하고, 성도를 세우며, 한 영혼과 다음 세대를 복음으로 섬기는 믿음의 공동체입니다.',
      en: 'Korean Church of Columbus is a gospel community worshiping in the Word and Spirit, building up believers, and serving one soul and the next generation in Christ.',
      zh: '哥伦布韩人教会是在圣经话语和圣灵中敬拜、建立信徒，并以福音服事一个灵魂与下一代的信仰共同体。',
      es: 'Korean Church of Columbus es una comunidad del evangelio que adora en la Palabra y el Espíritu, edifica a los creyentes y sirve a una alma y a la próxima generación en Cristo.'
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

const accessState = (env, request) => {
  const access = accessIdentity(env, request);
  return { enforced: access.enforced, email: access.email, hasJwt: access.hasJwt, emailAllowed: access.emailAllowed, allowed: access.allowed };
};

const TARGET_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Simplified Chinese' },
  { code: 'es', name: 'Spanish' }
];

const cloneJson = (value) => JSON.parse(JSON.stringify(value || {}));

const normalizeLocalized = (value) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return { ko: String(value.ko || ''), en: String(value.en || ''), zh: String(value.zh || ''), es: String(value.es || '') };
  }
  return { ko: String(value || ''), en: '', zh: '', es: '' };
};

const translateWithOpenAI = async ({ text, target, env }) => {
  const apiKey = env.OPENAI_API_KEY || env.OPENAI_TRANSLATION_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY secret is not configured for automatic translation.');
  }
  const language = TARGET_LANGUAGES.find((item) => item.code === target)?.name || target;
  const model = env.OPENAI_TRANSLATION_MODEL || 'gpt-4o-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You translate Korean church website copy for Korean Church of Columbus. Preserve biblical/church tone, names, times, addresses, URLs, and HTML tags such as <br>. Return only JSON with key "translation".'
        },
        {
          role: 'user',
          content: JSON.stringify({ targetLanguage: language, sourceLanguage: 'Korean', text })
        }
      ]
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenAI translation failed with HTTP ${response.status}`);
  const raw = data.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(raw);
  const translated = String(parsed.translation || '').trim();
  if (!translated) throw new Error(`OpenAI returned an empty ${language} translation.`);
  return translated;
};

const translateLocalized = async (localized, options) => {
  const result = normalizeLocalized(localized);
  const source = result.ko.trim();
  if (!source) {
    TARGET_LANGUAGES.forEach(({ code }) => { result[code] = ''; });
    return result;
  }
  const translator = options.translator || ((input) => translateWithOpenAI({ ...input, env: options.env || {} }));
  for (const { code } of TARGET_LANGUAGES) {
    result[code] = await translator({ text: result.ko, target: code });
  }
  return result;
};

export const applyAutoTranslations = async (payload, options = {}) => {
  const next = cloneJson(payload);
  next.hero = next.hero || {};
  next.hero.title = await translateLocalized(next.hero.title, options);
  next.hero.lead = await translateLocalized(next.hero.lead, options);
  next.translation = {
    source: 'ko',
    provider: 'openai',
    targets: TARGET_LANGUAGES.map((item) => item.code),
    updatedAt: new Date().toISOString()
  };
  return next;
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
  const admin = await requireAdmin(env, request);
  if (!admin.ok) return unauthorizedJson(admin);
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
  const admin = await requireAdmin(env, request);
  if (!admin.ok) return unauthorizedJson(admin);
  const actor = admin.identity.email || 'password-admin';
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== 'object') return json({ ok: false, error: 'Invalid JSON payload.' }, { status: 400 });
  let translatedPayload;
  try {
    translatedPayload = await applyAutoTranslations(payload, { env });
  } catch (error) {
    return json({ ok: false, error: error.message || 'Automatic translation failed.' }, { status: 502 });
  }
  const content = { ...translatedPayload, updatedAt: new Date().toISOString(), updatedBy: actor };
  const store = await writeContent(env, content);
  if (!store) return json({ ok: false, error: 'No D1 DB or KCOC_CONTENT KV binding is configured.' }, { status: 503 });
  return json({ ok: true, message: '한국어 원문을 OpenAI로 EN / 中文 / ES 자동 번역해 저장했습니다.', store, access: actor, publicReflection: 'saved with automatic translations', content });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'allow': 'GET, PUT, OPTIONS' } });
}
