import { redirect } from "next/navigation";
import { LoginForm } from "~/app/auth/login/components/LoginForm";
import { getLoginUser } from "~/servers/user/query";

export default async function LoginPage() {
  const session = await getLoginUser();
  if (session) {
    redirect("/profile");
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
