"use server";
import { revalidatePath } from "next/cache";

import { getServerSession } from "~/lib/auth/session";
import { prisma } from "~/lib/prisma";
import { CreateTicketManageInput } from "~/servers/ticketManager/createTicketManageSchema";

export const createTicketManager = async (input: CreateTicketManageInput) => {
  const session = await getServerSession();
  if (!session?.user?.userInfoId) {
    throw new Error("Session not found");
  }
  const ticketManager = await prisma.ticketManager.create({
    data: {
      ...input,
      creatorId: session.user.userInfoId,
    },
  });
  return ticketManager;
};

export const deleteTicketManager = async (id: number, ticketId: number) => {
  const result = await prisma.$transaction([
    prisma.ticketManager.delete({
      where: {
        id,
      },
    }),
    prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    }),
  ]);
  revalidatePath("/ticketManager");
  return result;
};
