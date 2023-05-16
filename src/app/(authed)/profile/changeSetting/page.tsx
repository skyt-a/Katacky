import { redirect } from "next/navigation";
import { ChangeSettingForm } from "~/app/(authed)/profile/changeSetting/components/ChangeSettingForm";
import { getUserInfo } from "~/lib/auth/getUser";
import { getDownloadURLFromStorage } from "~/lib/firebase/storageServer";

export default async function ChangeSettingPage() {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    redirect("/auth/login");
  }
  const imageUrl = await getDownloadURLFromStorage(userInfo?.profileImageUrl);
  return <ChangeSettingForm user={userInfo} imageUrl={imageUrl} />;
}
