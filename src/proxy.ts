import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_ROUTES, PROTECTED_ROUTES, AUTH_ROUTES } from "./constants/routes";

const intlMiddleware = createMiddleware(routing);

/**
 * Helper to check if a pathname matches any of the provided routes, 
 * ignoring the locale prefix (e.g., /en/admin matches /admin).
 */
function isMatchingPath(pathname: string, routes: string[]) {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
  return routes.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const userRole = request.cookies.get("userRole")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  // 1. Admin Access Control
  if (isMatchingPath(pathname, ADMIN_ROUTES)) {
    if (userRole !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/login"; 
      return NextResponse.redirect(url);
    }
  }

  // 2. Protected Routes (require authentication)
  if (isMatchingPath(pathname, PROTECTED_ROUTES)) {
    if (!accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 3. Auth Routes (redirect logged-in users away from login/register)
  if (isMatchingPath(pathname, AUTH_ROUTES)) {
    if (accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/user/categories";
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export default proxy;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
