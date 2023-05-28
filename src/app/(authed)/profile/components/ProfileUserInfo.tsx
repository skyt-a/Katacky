import { redirect } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "~/components/common";
import { AvatarImage } from "~/components/domain/profile/AvatarImage";
import { getDownloadURLFromStorage } from "~/lib/firebase/storageServer";
import { getLoginUser } from "~/servers/user/query";

export const ProfileUserInfo = async () => {
  const user = await getLoginUser();
  if (!user) {
    redirect("/auth/createUser");
  }
  const imageUrl = await getDownloadURLFromStorage(user?.profileImageUrl);
  return (
    <>
      <CardHeader>
        <AvatarImage imageUrl={imageUrl} />
        <div>
          <CardTitle className="mt-4 break-all">{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </CardHeader>
    </>
  );
};
