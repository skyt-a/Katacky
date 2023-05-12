import Image from "next/image";
import { redirect } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "~/components/common";
import { AvatarImage } from "~/components/domain/profile/AvatarImage";
import { getUserInfo } from "~/lib/auth/getUser";
import { storage } from "~/lib/firebase/server";
import { getDownloadURLFromStorage } from "~/lib/firebase/storageServer";

export const ProfileUserInfo = async () => {
  const user = await getUserInfo();
  if (!user) {
    redirect("/auth/createUser");
  }
  const imageUrl = await getDownloadURLFromStorage(user?.profileImageUrl);
  return (
    <>
      <CardHeader>
        <AvatarImage imageUrl={imageUrl} />
        <div>
          <CardTitle className="mt-4">{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </CardHeader>
    </>
  );
};
