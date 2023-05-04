import { sendFirebaseCloudMessage } from "./../../../../lib/firebase/sendMessage";
import { TicketManageType } from "@prisma/client";
import { endOfMonth, endOfWeek, endOfYear, isSameDay } from "date-fns";
import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

const targetDateFunc = {
  [TicketManageType.ONCE_DAY]: (date: Date) => date,
  [TicketManageType.ONCE_MONTH]: (date: Date) => endOfMonth(date),
  [TicketManageType.ONCE_YEAR]: (date: Date) => endOfYear(date),
  [TicketManageType.ONCE_WEEK]: (date: Date) => endOfWeek(date),
};

async function Handler() {
  const managers = await prisma.ticketManager.findMany();
  const date = new Date();
  const holderIds = new Set<number>();
  for (let manager of managers) {
    if (isSameDay(targetDateFunc[manager.type](date), date)) {
      const ticket = await prisma.ticket.findUnique({
        where: { id: manager.ticketId },
      });
      if (ticket) {
        const { id, ...ticketUse } = ticket;
        for (let i = 0; i < manager.count; i++) {
          await prisma.ticket.create({
            data: {
              ...ticketUse,
              holderId: manager.retrieveUserId,
            },
          });
          holderIds.add(manager.retrieveUserId);
        }
      }
    }
  }

  const deviceTokens = await Promise.all(
    Array.from(holderIds).map((id) =>
      prisma.user
        .findUnique({ where: { id } })
        .then((user) => user?.deviceToken)
    )
  );
  const result = await sendFirebaseCloudMessage(
    {
      title: "チケットが届きました",
      body: "今回のチケットが届きました",
    },
    deviceTokens.filter(
      (token): token is string => token !== undefined && token !== null
    )
  );

  return NextResponse.json({ result });
}

export { Handler as GET, Handler as POST };
