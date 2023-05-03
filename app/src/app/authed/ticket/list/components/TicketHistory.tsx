import { Ticket } from "@prisma/client";
import { TicketCard } from "~/app/authed/ticket/list/components/TicketCard";
import { getUserInfo } from "~/lib/auth/getUser";
import { prisma } from "~/lib/prisma";
import { UnionNullToUndefined } from "~/util/types";

export const TicketHistory = async () => {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  const ticket = await prisma.ticket.findMany({
    where: { creatorId: user.id, isUsed: true },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <ul>
      {ticket.length === 0 && <p>利用履歴はありません</p>}
      {ticket.map((ticket) => (
        <li key={ticket.id} className="[&:not(:first-of-type)]:mt-2">
          {/** @ts-expect-error Async Component  */}
          <TicketCard
            key={ticket.id}
            ticket={ticket as UnionNullToUndefined<Ticket>}
            isMine={user.id === ticket.creatorId}
          />
        </li>
      ))}
    </ul>
  );
};
