import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "zh", "ja", "ko", "es", "fr", "de", "pt", "ru", "ar", "hi"];
const defaultLocale = "en";

// Paths that should NOT be redirected (API, static files, etc.)
const excludedPaths = ["/api", "/_next", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

function getLocale(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, priority] = lang.trim().split(";q=");
        return { code: code.split("-")[0].toLowerCase(), priority: priority ? parseFloat(priority) : 1 };
      })
      .sort((a, b) => b.priority - a.priority);

    for (const { code } of preferred) {
      if (locales.includes(code)) {
        return code;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For root path, redirect to detected locale
  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // For other paths (like /json-formatter), redirect to locale-prefixed path
  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
