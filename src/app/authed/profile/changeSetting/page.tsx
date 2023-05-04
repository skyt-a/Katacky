import { redirect } from "next/navigation";
import { ChangeSettingForm } from "~/app/authed/profile/changeSetting/components/ChangeSettingForm";
import { getUserInfo } from "~/lib/auth/getUser";

export default async function ChangeSettingPage() {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    redirect("/auth/login");
  }
  return <ChangeSettingForm user={userInfo} />;
}
