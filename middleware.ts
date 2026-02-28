import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");

    // If no session cookie, redirect to login
    if (!session) {
      // Allow access to login page
      if (request.nextUrl.pathname === "/admin") {
        return NextResponse.next();
      }

      // Redirect to admin login for other admin pages
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: "/admin/:path*",
};
