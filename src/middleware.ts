import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

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
  console.log("middleware", session);
  res.cookies.set("authId", session?.user.id ?? "");
  console.log(req.nextUrl.pathname);
  if (!session) {
    if (!req.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return res;
  }
  if (req.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/auth/:path*", "/profile/:path*"],
};
