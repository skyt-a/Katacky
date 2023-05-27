import { redirect } from "next/navigation";
import { getLoginUser } from "~/servers/user/query";

export default async function Root() {
  const user = await getLoginUser();
  if (user) {
    redirect("/profile");
  } else {
    redirect("/auth/login");
  }
}
