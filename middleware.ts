import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
});

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req) || NextResponse.next();

  const locale = req.nextUrl.pathname.split('/')[1] || 'ar';

  response.cookies.set('locale', locale, {
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
