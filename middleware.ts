import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';

const protectedRoutes = ["/dashboard", "/job-posting"];

const routing = {
  locales: ["us", "zh"],
  defaultLocale: "zh",
  localePrefix: "as-needed" as const
};

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !token) {
    const url = new URL("/auth/sign-in", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
