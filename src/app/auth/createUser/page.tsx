import { redirect } from "next/navigation";
import { CreateUserForm } from "~/app/auth/createUser/components/CreateUserForm";
import { getUser, getUserInfo } from "~/lib/auth/getUser";

export default async function CreateUserPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  const userInfo = await getUserInfo();
  if (userInfo) {
    redirect("/profile");
  }

  return (
    <>
      <CreateUserForm user={user as any} />
    </>
  );
}
