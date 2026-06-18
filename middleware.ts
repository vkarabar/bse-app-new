import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/lib/i18n/locales';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const strippedPath =
      pathname === '/en' ? '/' : pathname.replace(/^\/en/, '') || '/';
    requestHeaders.set('x-locale', 'en');
    return NextResponse.rewrite(new URL(strippedPath, request.url), {
      request: { headers: requestHeaders },
    });
  }

  requestHeaders.set('x-locale', defaultLocale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
