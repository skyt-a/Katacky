"use server";

import { getServerSession } from "~/lib/auth/session";
import { prisma } from "~/lib/prisma";
import { CreateUserSchema } from "~/servers/user/createUserSchema";

export const createUser = async (value: CreateUserSchema) => {
  const user = await prisma.user.create({
    data: value,
  });
  return user;
};

export const joinGroup = async (groupId: number) => {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const user = await prisma.user.update({
    data: {
      groupId,
    },
    where: {
      id: session?.user.userInfoId,
    },
  });
  return user;
};

export const leaveGroup = async () => {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const user = await prisma.user.update({
    data: {
      groupId: null,
    },
    where: {
      id: session?.user.userInfoId,
    },
  });
  return user;
};

export const updateDeviceToken = async (deviceToken: string) => {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const user = await prisma.user.update({
    data: {
      deviceToken,
    },
    where: {
      id: session?.user.userInfoId,
    },
  });
  return user;
};

export const updateName = async (name: string) => {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const user = await prisma.user.update({
    data: {
      name,
    },
    where: {
      id: session?.user.userInfoId,
    },
  });
  return user;
};

export const updateProfileImage = async (url: string) => {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const updatedUser = await prisma.user.update({
    data: {
      profileImageUrl: url,
    },
    where: {
      id: session?.user.userInfoId,
    },
  });
  return updatedUser;
};
