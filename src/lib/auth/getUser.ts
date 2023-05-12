import "server-only";
import { cache } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth/authOption";
import { rsc } from "~/lib/trpc/server/trpc";

export const getUser = cache(async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return;
  }
  return user;
});

export const getUserInfo = cache(async () => {
  return await rsc.user.loggedInUser.fetch();
});
