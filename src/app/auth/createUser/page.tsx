import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { CreateUserForm } from "~/app/auth/createUser/components/CreateUserForm";
import { getLoginUser } from "~/servers/user/query";

export default async function CreateUserPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  const userInfo = await getLoginUser();
  if (userInfo) {
    redirect("/profile");
  }

  return (
    <>
      <CreateUserForm user={session.user as any} />
    </>
  );
}
