import { redirect } from "next/navigation";
import { createClientServer } from "~/lib/supabase/server";

export default async function Root() {
  const supabase = createClientServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/authed/profile");
  } else {
    redirect("/auth/login");
  }
}
