import { NextResponse } from "next/server";
import { createClientRouteHandler } from "~/lib/supabase/route";

export async function GET(request: Request) {
  const res = NextResponse.next();
  const supabase = createClientRouteHandler();
  const { error, data } = await supabase.auth.getUser();
  console.log(data, error);
  // if (error) {
  //   return NextResponse.error();
  // }
  if (data.user) {
    return NextResponse.json({ user: data.user });
  }
  // セッションが存在しないならcookieからセッション取得
  const refreshToken = res.cookies.get("my-refresh-token")?.value;
  const accessToken = res.cookies.get("my-access-token")?.value;

  if (!refreshToken || !accessToken) {
    return NextResponse.error();
  }
  const {
    data: { user: userFromCookie },
  } = await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  return NextResponse.json({ user: userFromCookie });
}
