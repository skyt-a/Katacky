import { Ticket } from "~/components/domain/tickets/Ticket";
import { rsc } from "~/lib/trpc/server/trpc";

export const TicketHistory = async () => {
  const ticket = await rsc.ticket.usedList.fetch();
  return (
    <ul>
      {ticket.length === 0 && (
        <p className="mt-4 text-center">利用履歴はありません</p>
      )}
      {ticket.map((ticket) => (
        <li key={ticket.id} className="[&:not(:first-of-type)]:mt-2">
          {/** @ts-expect-error Async Component  */}
          <Ticket key={ticket.id} {...ticket} />
        </li>
      ))}
    </ul>
  );
};
