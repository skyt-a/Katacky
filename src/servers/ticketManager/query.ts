"use server";

import { getServerSession } from "~/lib/auth/session";
import { prisma } from "~/lib/prisma";

export const getTicketManagers = async () => {
  const session = await getServerSession();
  if (!session?.user?.userInfoId) {
    throw new Error("Session not found");
  }
  const ticketManagers = await prisma.ticketManager.findMany({
    where: {
      creatorId: session.user.userInfoId,
    },
  });
  return ticketManagers;
};
