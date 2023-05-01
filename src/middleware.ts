import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  console.log("styarta", req.nextUrl.pathname);

  if (!req.nextUrl.pathname.startsWith("/api")) {
    return res;
  }
  const supabase = createMiddlewareSupabaseClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    if (!req.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return res;
  }
  if (["", "/"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/authed/profile", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/authed/profile", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
