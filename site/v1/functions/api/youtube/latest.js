const CHANNEL_HANDLE = '@KoreanChurchofColumbus';
const CHANNEL_ID = 'UC49alAu8PvxfwdueOdw0O3Q';
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`;
const VIDEOS_URL = `${CHANNEL_URL}/videos`;
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const fallbackItems = [
  {
    id: 'PLuzUYNV8E-aTJhoS5FhvO8s3F0GNBeDWU',
    title: 'Korean Church of Columbus YouTube Channel',
    url: CHANNEL_URL,
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLuzUYNV8E-aTJhoS5FhvO8s3F0GNBeDWU',
    thumbnail: '/media/existing-home/DSC06622-1500x630.jpg',
    published: '',
    relativeTime: '',
    source: 'fallback'
  }
];

const json = (body, init = {}) => new Response(JSON.stringify(body, null, 2), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'public, max-age=900, stale-while-revalidate=3600',
    ...(init.headers || {})
  }
});

const decodeEntities = (value = '') => String(value)
  .replace(/\\u0026/g, '&')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .trim();

const uniqueById = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (!item.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const parseRss = (xml) => {
  const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).map((match) => match[1]);
  return entries.map((entry) => {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] || '';
    const title = decodeEntities(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] || '';
    const mediaGroup = entry.match(/<media:group>([\s\S]*?)<\/media:group>/)?.[1] || '';
    const thumbnail = decodeEntities(mediaGroup.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
    return {
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnail,
      published,
      relativeTime: '',
      source: 'rss'
    };
  }).filter((item) => item.id && item.title);
};

const parseVideosPage = (html) => {
  const chunks = html.split('"lockupViewModel":').slice(1);
  const items = chunks.map((chunk) => {
    const id = chunk.match(/"videoId":"([A-Za-z0-9_-]{11})"/)?.[1] || '';
    const title = decodeEntities(chunk.match(/"lockupMetadataViewModel":\{"title":\{"content":"([\s\S]*?)"\}/)?.[1]
      || chunk.match(/"title":\{"content":"([\s\S]*?)"\}/)?.[1]
      || '');
    const relativeTime = decodeEntities(chunk.match(/"metadataParts":\[\{"text":\{"content":"[^"]*"\}\},\{"text":\{"content":"([^"]+)"\}\}/)?.[1] || '');
    const thumbRaw = chunk.match(/"url":"(https:\/\/i\.ytimg\.com\/vi\/[^"]+)"/)?.[1] || '';
    const thumbnail = decodeEntities(thumbRaw.split('?')[0] || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
    return {
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnail,
      published: '',
      relativeTime,
      source: 'videos-page'
    };
  }).filter((item) => item.id && item.title);
  return uniqueById(items);
};

const fetchText = async (url) => {
  const res = await fetch(url, {
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'user-agent': 'Mozilla/5.0 KCOC Website Bot (+https://kcocoh.org)'
    }
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.text();
};

export async function onRequestGet() {
  let items = [];
  let source = 'none';
  const errors = [];

  try {
    items = parseRss(await fetchText(RSS_URL));
    source = 'rss';
  } catch (error) {
    errors.push(`rss: ${error.message}`);
  }

  if (!items.length) {
    try {
      items = parseVideosPage(await fetchText(VIDEOS_URL));
      source = 'videos-page';
    } catch (error) {
      errors.push(`videos-page: ${error.message}`);
    }
  }

  const fallback = !items.length;
  if (fallback) items = fallbackItems;

  return json({
    ok: true,
    channel: { id: CHANNEL_ID, handle: CHANNEL_HANDLE, url: CHANNEL_URL },
    items: items.slice(0, 6),
    source,
    fallback,
    errors: fallback ? errors : undefined
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, OPTIONS' } });
}
