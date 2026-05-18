const allowedHosts = new Set(['media.kcocoh.org']);

const badRequest = (message, status = 400) => new Response(message, {
  status,
  headers: {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export async function onRequestGet({ request }) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get('src') || '';

  let target;
  try {
    target = new URL(src);
  } catch (_) {
    return badRequest('Missing or invalid bulletin URL.');
  }

  if (target.protocol !== 'https:' || !allowedHosts.has(target.hostname)) {
    return badRequest('Bulletin URL is not allowed.', 403);
  }

  const upstream = await fetch(target.href, {
    headers: {
      'accept': 'application/pdf,*/*;q=0.8',
      'user-agent': 'KCOC bulletin viewer'
    },
    cf: { cacheTtl: 3600, cacheEverything: true }
  });

  if (!upstream.ok) {
    return badRequest('Bulletin file could not be loaded.', upstream.status);
  }

  const contentType = upstream.headers.get('content-type') || 'application/pdf';
  if (!contentType.toLowerCase().includes('pdf')) {
    return badRequest('Bulletin file is not a PDF.', 415);
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'inline; filename="kcoc-bulletin.pdf"',
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
      'x-content-type-options': 'nosniff'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { allow: 'GET, OPTIONS' }
  });
}
