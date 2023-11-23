import "server-only";
import { prisma } from "~/lib/prisma";
import { getServerSession } from "~/lib/auth/session";
import { UnionNullToUndefined } from "~/util/types";
import { Ticket } from "@prisma/client";

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

export const ticketUsed = async (): Promise<UnionNullToUndefined<Ticket>[]> => {
  const session = await getServerSession();
  const tickets = await prisma.ticket.findMany({
    where: {
      holderId: session?.user.userInfoId,
      isUsed: true,
      isScheduled: false,
    },
    orderBy: {
      usedDate: "desc",
    },
  });
  const ticketsWithUndefined = tickets.map((ticket) => {
    const ticketEntries = Object.entries(ticket);
    const partialTicket: Partial<Ticket> = ticket;
    for (let [key, value] of ticketEntries) {
      if (value === null) {
        partialTicket[key as keyof Ticket] = undefined;
      }
    }
    return partialTicket as UnionNullToUndefined<Ticket>;
  });

  return ticketsWithUndefined;
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
