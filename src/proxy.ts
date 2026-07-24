import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

function getSessionPayload(req: NextRequest): Record<string, any> | null {
  try {
    const cookie = SESSION_COOKIES.reduce<string | undefined>(
      (val, name) => val ?? req.cookies.get(name)?.value,
      undefined
    );
    if (!cookie) return null;
    const parts = cookie.split(".");
    if (parts.length < 2) return null;
    const decoded = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && process.env.NODE_ENV === "production") {
    const payload = getSessionPayload(req);
    const userRole = payload?.user?.role ?? payload?.role;
    if (!payload || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
