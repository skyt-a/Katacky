import { Suspense } from "react";
import { LogoutButton } from "~/app/authed/profile/components/LogoutButton";
import { ProfileUserInfo } from "~/app/authed/profile/components/ProfileUserInfo";
import { Card } from "~/components/common";
import { Spinner } from "~/components/common/spinner";

export const Profile = () => {
  return (
    <div>
      <Card className="w-full">
        <Suspense fallback={<Spinner />}>
          {/** @ts-expect-error Async Component  */}
          <ProfileUserInfo />
        </Suspense>
      </Card>
      <div className="w-full flex justify-center mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};
