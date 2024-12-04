import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { languages, fallbackLng } from '@/lib/settings';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const browserLanguages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(browserLanguages, languages, fallbackLng);
  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // 排除不需要重定向的路径
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}; 