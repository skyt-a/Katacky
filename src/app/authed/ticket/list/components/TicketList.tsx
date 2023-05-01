import { Ticket } from "~/components/domain/tickets/Ticket";
import { TicketCard } from "~/app/authed/ticket/list/components/TicketCard";
import { getUserInfo } from "~/lib/auth/getUser";
import { prisma } from "~/lib/prisma";
import supabase from "~/lib/supabase";

export const TicketList = async () => {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  const ticket = await prisma.ticket.findMany({
    where: { creatorId: user.id },
  });
  return (
    <ul>
      {ticket.map((ticket) => (
        <li key={ticket.id} className="[&:not(:first-of-type)]:mt-2">
          <TicketCard key={ticket.id} ticket={ticket} />
        </li>
      ))}
    </ul>
  );
};
