import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { pageUrls } from "@/lib/constants/page-urls";

const protectedRoutes = [
    pageUrls.DASHBOARD,
    pageUrls.FIND_JOBS,
    pageUrls.JOB_POSTING,
    pageUrls.CHAT,
    pageUrls.SEND_OFFER,
    "/settings"
];

const routing = {
    locales: ["us", "zh"],
    defaultLocale: "zh",
    localePrefix: "as-needed" as const
};

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;
    const pathWithoutLocale = path.replace(/^\/(?:us|zh)/, '');
    const isProtectedRoute = protectedRoutes.some(
        (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );

    if (isProtectedRoute && !token) {
        const locale = path.startsWith('/us') ? 'us' : path.startsWith('/zh') ? 'zh' : routing.defaultLocale;
        const signInUrl = `/${locale}${pageUrls.SIGN_IN}`;
        const url = new URL(signInUrl, request.url);
        url.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
