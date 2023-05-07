import "server-only";
import { cache } from "react";
import { prisma } from "~/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth/authOption";
import { createCaller } from "~/servers";

export const getUser = cache(async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return;
  }
  return user;
});

export const getUserInfo = cache(async () => {
  const caller = await createCaller();
  const userInfo = await caller.user.loggedInUser();
  return userInfo;
});
