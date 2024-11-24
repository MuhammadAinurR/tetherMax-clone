import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/i18nNavigation';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/:locale/benefit(.*)',
  '/:locale/uidlinking',
]);

const isAuthPage = createRouteMatcher([
  '/sign-in(.*)',
  '/:locale/sign-in(.*)',
  '/sign-up(.*)',
  '/:locale/sign-up(.*)',
]);

const isApiRoute = createRouteMatcher(['/api/(.*)']);

const publicApiRoutes = createRouteMatcher([
  // Add your public API routes here
  '/api/public/(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (isApiRoute(request)) {
    // Allow public API routes to bypass authentication
    if (publicApiRoutes(request)) {
      return;
    }

    // Protect all other API routes
    await auth.protect();
    return;
  }

  // Skip middleware for API routes
  if (isApiRoute(request)) {
    return;
  }

  // Run Clerk middleware only when it's necessary
  if (isAuthPage(request) || isProtectedRoute(request)) {
    if (isProtectedRoute(request)) {
      const locale =
        request.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

      // throw on home page
      const signInUrl = new URL(`${locale}/`, request.url);

      await auth.protect({
        // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
        unauthenticatedUrl: signInUrl.toString(),
      });
    }

    return intlMiddleware(request);
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
