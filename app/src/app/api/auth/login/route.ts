import { NextResponse } from "next/server";
import { createClientRouteHandler } from "~/lib/supabase/route";

export async function POST(request: Request) {
  const res = await request.json();
  const supabase = createClientRouteHandler();
  const user = await supabase.auth.signInWithPassword({
    email: res.email,
    password: res.password,
  });
  if (user.error || !user.data.session) {
    return NextResponse.error();
  }
  const response = NextResponse.json({ user });
  response.cookies.set("my-access-token", user.data.session.access_token, {
    maxAge: 100 * 365 * 24 * 60 * 60, // 100 years, never expires,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  response.cookies.set("my-refresh-token", user.data.session.refresh_token, {
    maxAge: 100 * 365 * 24 * 60 * 60, // 100 years, never expires,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  return response;
}

// supabase.auth.onAuthStateChange((event, session) => {
//   if (event === "SIGNED_OUT") {
//     // delete cookies on sign out
//     const expires = new Date(0).toUTCString();
//     document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
//     document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
//   } else if (
//     session &&
//     (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")
//   ) {
//     const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
//     document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
//     document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
//     if (event === "SIGNED_IN") {
//       router.push("/authed/profile");
//     }
//   }
// });
