"use server";

import { v4 } from "uuid";
import { getServerSession } from "~/lib/auth/session";
import { prisma } from "~/lib/prisma";

export const createGroup = async (name: string) => {
  const session = await getServerSession();
  if (!session || !session?.user.userInfoId) {
    throw new Error("Session not found");
  }
  const uuid = v4();
  const group = await prisma.group.create({
    data: {
      name,
      creatorId: session?.user.userInfoId,
      token: uuid,
    },
  });
  const user = await prisma.user.update({
    data: {
      groupId: group.id,
    },
    where: {
      id: session?.user.userInfoId,
    },
  });
  return [group, user];
};

export const deleteGroup = async (groupId: number) => {
  const group = await prisma.group.delete({
    where: {
      id: groupId,
    },
  });
  return group;
};
