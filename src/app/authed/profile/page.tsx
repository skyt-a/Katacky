import { Suspense } from "react";
import { Profile } from "~/app/authed/profile/components/Profile";
import { Spinner } from "~/components/common/spinner";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Profile />
    </Suspense>
  );
}
