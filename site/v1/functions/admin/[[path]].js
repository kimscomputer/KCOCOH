import { requireAdmin } from '../_shared/admin-auth.js';

const isLoginPath = (url) => {
  const path = new URL(url).pathname;
  return path === '/admin/login' || path.startsWith('/admin/login/');
};

const redirectToLogin = (request) => {
  const url = new URL(request.url);
  const login = new URL('/admin/login/', url.origin);
  if (url.pathname !== '/admin/' && url.pathname !== '/admin') login.searchParams.set('next', `${url.pathname}${url.search}`);
  return Response.redirect(login.toString(), 302);
};

export async function onRequest(context) {
  const { env, request } = context;
  if (isLoginPath(request.url)) return context.next();
  const auth = await requireAdmin(env, request);
  if (!auth.ok) return redirectToLogin(request);
  const response = await context.next();
  const guarded = new Response(response.body, response);
  guarded.headers.set('cache-control', 'private, no-store');
  guarded.headers.set('x-robots-tag', 'noindex, nofollow');
  return guarded;
}
