import { NextResponse } from "next/server";
import { createClientRouteHandler } from "~/lib/supabase/route";

export async function POST() {
  const supabase = createClientRouteHandler();
  const user = await supabase.auth.signOut();

  const response = NextResponse.json({ user });
  response.cookies.delete("my-access-token");
  response.cookies.delete("my-refresh-token");
  return response;
}
