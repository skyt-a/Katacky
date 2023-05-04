import "server-only";
import { cache } from "react";
import { prisma } from "~/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth/authOption";

export const getUser = cache(async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return;
  }
  return user;
});

export const getUserInfo = cache(async () => {
  const user = await getUser();
  const authId = user?.uid;
  if (!authId) {
    return null;
  }
  const userInfo = await prisma.user.findFirst({
    where: { authId },
  });
  return userInfo;
});
