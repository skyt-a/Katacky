"use server";
import { getServerSession } from "~/lib/auth/session";
import { prisma } from "~/lib/prisma";

export const getGroup = async () => {
  const session = await getServerSession();
  if (!session?.user?.userInfoId) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.userInfoId },
  });
  if (!user?.groupId) {
    return null;
  }
  const group = await prisma.group.findUnique({
    where: {
      id: user?.groupId,
    },
  });
  return group;
};

export const groupByToken = async (token: string) => {
  const group = await prisma.group.findUnique({
    where: {
      token,
    },
  });
  return group;
};

export const groupHistory = async (userIds: number[]) => {
  const groupHistory = await prisma.ticket.findMany({
    take: 10,
    include: {
      holder: true,
    },
    where: {
      holderId: {
        in: userIds,
      },
      isUsed: true,
    },
    orderBy: {
      usedDate: "desc",
    },
  });
  return groupHistory;
};
