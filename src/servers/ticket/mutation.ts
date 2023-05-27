"use server";
import { revalidatePath } from "next/cache";

import { User } from "@prisma/client";
import { isBefore } from "date-fns";
import { getServerSession } from "~/lib/auth/session";
import { sendFirebaseCloudMessage } from "~/lib/firebase/sendMessage";
import { prisma } from "~/lib/prisma";
import { CreateTicketSchema } from "~/servers/ticket/createTicketSchema";

export const createTicket = async (
  value: CreateTicketSchema,
  isScheduled = false
) => {
  if (value.expiredDate && isBefore(value.expiredDate, new Date())) {
    throw new Error("有効期限が過去になっています");
  }
  if (
    value.availableDateFrom &&
    isBefore(value.availableDateFrom, new Date())
  ) {
    throw new Error("利用開始日時が過去になっています");
  }
  if (
    value.expiredDate &&
    value.availableDateFrom &&
    isBefore(value.expiredDate, value.availableDateFrom)
  ) {
    throw new Error("利用開始日時が有効期限より後になっています");
  }
  const session = await getServerSession();
  if (!session?.user.userInfoId) {
    throw new Error("userInfoId not found");
  }
  const ticket = await prisma.ticket.create({
    data: {
      ...value,
      holderId: session.user.userInfoId,
      creatorId: session.user.userInfoId,
      isScheduled,
    },
  });
  return ticket;
};

export const useTicket = async (id: number) => {
  const ticket = await prisma.ticket.update({
    where: {
      id,
    },
    data: {
      isUsed: true,
      usedDate: new Date(),
    },
  });
  revalidatePath("/ticket/hold");
  return ticket;
};

export const sendTicket = async (
  user: User,
  ticketId: number,
  toId: number
) => {
  const ticket = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      holderId: toId,
    },
  });
  const retrieveUser = await prisma.user.findUnique({
    where: {
      id: toId,
    },
  });
  if (retrieveUser?.deviceToken) {
    await sendFirebaseCloudMessage(
      {
        title: "チケットが届きました",
        body: `${user?.name}からチケット「${ticket.title}」が届きました！`,
      },
      [retrieveUser.deviceToken]
    );
  }
  revalidatePath("/ticket/hold");
  return ticket;
};

export const deleteTicket = async (id: number) => {
  const ticket = await prisma.ticket.delete({
    where: {
      id,
    },
  });
  revalidatePath("/ticket/hold");
  return ticket;
};
