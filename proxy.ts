import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split("/")[1];

  const looksLikeLocale = /^[a-z]{2}(-[a-z]{2})?$/i.test(firstSegment);

  const isSupportedLocale = routing.locales.some(
    (locale) => locale === firstSegment,
  );

  if (looksLikeLocale && !isSupportedLocale) {
    const url = request.nextUrl.clone();

    // Remove the unsupported locale from the URL
    const remainingPath = pathname.split("/").slice(2).join("/");
    url.pathname = `/${remainingPath}`;

    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
