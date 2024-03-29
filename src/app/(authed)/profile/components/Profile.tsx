import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Suspense } from "react";
import { ChangeSettingButton } from "~/app/(authed)/profile/components/ChangeSettingButton";
import { LogoutButton } from "~/app/(authed)/profile/components/LogoutButton";
import { ProfileSetting } from "~/app/(authed)/profile/components/ProfileSetting";
import { ProfileUserInfo } from "~/app/(authed)/profile/components/ProfileUserInfo";
import { Card } from "~/components/common";
import { CardSkelton } from "~/components/layout/CardSkelton";

export const Profile = () => {
  return (
    <div>
      <Card className="w-full">
        <Suspense fallback={<CardSkelton />}>
          <ProfileUserInfo />
        </Suspense>
      </Card>
      <div className="w-full flex justify-center mt-4">
        <ChangeSettingButton />
      </div>
      <div className="w-full flex justify-center mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};
