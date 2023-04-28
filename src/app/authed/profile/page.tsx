import { cookies } from "next/dist/client/components/headers";
import { Suspense } from "react";
import { Profile } from "~/app/authed/profile/components/Profile";
import { Spinner } from "~/components/common/spinner";
import { prisma } from "~/lib/prisma";
import supabase from "~/lib/supabase";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Profile />
    </Suspense>
  );
}
