import { redirect } from "next/navigation";
import { LoginForm } from "~/app/auth/login/components/LoginForm";
import { getUser } from "~/lib/auth/getUser";

export default async function LoginPage() {
  const session = await getUser();
  if (session) {
    redirect("/authed/profile");
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
