import { redirect } from "next/navigation";
import { ChangeSettingForm } from "~/app/(authed)/profile/changeSetting/components/ChangeSettingForm";
import { getDownloadURLFromStorage } from "~/lib/firebase/storageServer";
import { getLoginUser } from "~/servers/user/query";
import { updateName, updateProfileImage } from "~/servers/user/mutation";

export default async function ChangeSettingPage() {
  const userInfo = await getLoginUser();
  if (!userInfo) {
    redirect("/auth/login");
  }
  const imageUrl = await getDownloadURLFromStorage(userInfo?.profileImageUrl);
  return (
    <ChangeSettingForm
      user={userInfo}
      imageUrl={imageUrl}
      updateName={updateName}
      updateProfileImage={updateProfileImage}
    />
  );
}
