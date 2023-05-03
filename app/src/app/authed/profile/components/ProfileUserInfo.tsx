import { redirect } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "~/components/common";
import { getUserInfo } from "~/lib/auth/getUser";

export const ProfileUserInfo = async () => {
  const user = await getUserInfo();
  if (!user) {
    redirect("/auth/createUser");
  }
  return (
    <>
      <CardHeader>
        <CardTitle>{user?.name}さんのプロフィール</CardTitle>
        <CardDescription> メールアドレス: {user?.email}</CardDescription>
      </CardHeader>
    </>
  );
};
