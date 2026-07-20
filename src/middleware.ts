import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // In production: require ADMIN role
    if (process.env.NODE_ENV === "production") {
      if (!req.auth) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      const role = (req.auth.user as { role?: string })?.role;
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    // In development: allow access for easy testing
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
