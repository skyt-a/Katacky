import { TicketList } from "~/app/authed/ticket/list/components/TicketList";
import "./ticketAnimation.css";
import { TicketCard } from "~/app/authed/ticket/list/components/TicketCard";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { getUserInfo } from "~/lib/auth/getUser";
import { prisma } from "~/lib/prisma";

export const TicketListWrapper = async () => {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  const ticket = await prisma.ticket.findMany({
    where: {
      holderId: user.id,
      isUsed: false,
      isScheduled: false,
      OR: [
        {
          expiredDate: null,
        },
        {
          expiredDate: {
            gte: new Date(),
          },
        },
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return <TicketList tickets={ticket} user={user} />;
};
