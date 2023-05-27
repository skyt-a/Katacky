import "server-only";
import { getServerSession } from "~/lib/auth/session";
import { prisma } from "~/lib/prisma";

export const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      authId: id,
    },
  });
  return user;
};

export const getLoginUser = async () => {
  const session = await getServerSession();
  if (!session) return null;
  const user = await prisma.user.findFirst({
    where: {
      authId: session.user.uid,
    },
  });
  return user;
};

export const getUserByGroup = async (groupId: number) => {
  const user = await prisma.user.findMany({
    where: {
      groupId,
    },
  });
  return user;
};
