import { Ticket } from "~/components/domain/tickets/Ticket";
import { getUserInfo } from "~/lib/auth/getUser";
import { createCaller } from "~/servers";

export const TicketHistory = async () => {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  const caller = await createCaller();
  const ticket = await caller.ticket.useList();
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
