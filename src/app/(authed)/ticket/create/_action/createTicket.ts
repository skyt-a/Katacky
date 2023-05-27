"use server";

import { User } from "@prisma/client";
import { isBefore } from "date-fns";
import { CreateTicketSchema } from "~/servers/ticket/createTicketSchema";
import { prisma } from "~/lib/prisma";

export const createTicket = async (value: CreateTicketSchema, user: User) => {
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
  const ticket = await prisma.ticket.create({
    data: {
      ...value,
      holderId: user.id,
      creatorId: user.id,
    },
  });
  return ticket;
};
