import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { languages, fallbackLng } from '@/lib/settings';

function getLocale(request: NextRequest): string | null {
  try {
    // 检查是否是搜索引擎爬虫
    const userAgent = request.headers.get('user-agent') || '';
    if (userAgent.toLowerCase().includes('googlebot')) {
      return null; // 对爬虫直接返回默认语言
    }

    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // 添加错误处理
    try {
      const browserLanguages = new Negotiator({ headers: negotiatorHeaders }).languages();
      return matchLocale(browserLanguages, languages, fallbackLng);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 如果是根路径，不做重定向
  if (pathname === '/') {
    return;
  }

  // 检查是否访问了不支持的语言路径
  const firstSegment = pathname.split('/')[1];
  if (firstSegment === 'en') {
    return new Response('Not Found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  if (firstSegment && !languages.includes(firstSegment)) {
    // 如果路径以语言代码格式开头但不是支持的语言，返回 404
    if (/^[a-zA-Z]{2}(-[a-zA-Z]{2,})?$/i.test(firstSegment)) {
      return new Response('Not Found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
  
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    if(!locale || locale === 'en') {
      return new Response('Not Found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
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