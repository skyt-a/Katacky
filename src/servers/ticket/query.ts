import "server-only";
import { prisma } from "~/lib/prisma";
import { getServerSession } from "~/lib/auth/session";

export const ticketHolds = async () => {
  const session = await getServerSession();
  const ticket = await prisma.ticket.findMany({
    where: {
      holderId: session?.user.userInfoId,
      isUsed: false,
      isScheduled: false,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return ticket;
};

export const ticketUsed = async () => {
  const session = await getServerSession();
  const ticket = await prisma.ticket.findMany({
    where: {
      holderId: session?.user.userInfoId,
      isUsed: true,
      isScheduled: false,
    },
    orderBy: {
      usedDate: "desc",
    },
  });
  return ticket;
};

export const ticketsByIds = async (ids: number[]) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return tickets;
};
