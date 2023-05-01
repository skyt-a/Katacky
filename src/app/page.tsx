import { redirect } from "next/navigation";
import supabase from "~/lib/supabase";

export default async function Root() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/authed/profile");
  } else {
    redirect("/auth/login");
  }
}
