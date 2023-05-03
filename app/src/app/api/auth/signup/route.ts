import { NextResponse } from "next/server";
import { createClientRouteHandler } from "~/lib/supabase/route";

export async function POST(request: Request) {
  const supabase = createClientRouteHandler();
  const res = await request.json();
  const user = await supabase.auth.signUp({
    email: res.email,
    password: res.password,
  });
  return NextResponse.json({ user });
}
