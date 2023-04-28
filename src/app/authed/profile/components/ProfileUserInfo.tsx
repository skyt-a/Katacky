import { redirect } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "~/components/common";
import { prisma } from "~/lib/prisma";
import supabase from "~/lib/supabase";

export const ProfileUserInfo = async () => {
  const authId = (await supabase.auth.getSession())?.data?.session?.user.id;
  const user = await prisma.user.findFirst({
    where: { authId },
  });
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
