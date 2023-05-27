import { Ticket } from "@prisma/client";
import { ManagerCard } from "~/app/(authed)/manager/components/ManagerCard";
import { UnionNullToUndefined } from "~/util/types";
import { getTicketManagers } from "~/servers/ticketManager/query";
import { ticketsByIds } from "~/servers/ticket/query";

export default async function ManagerPage() {
  const managers = await getTicketManagers();
  const tickets = await ticketsByIds(
    managers.map((manager) => manager.ticketId)
  );

  return (
    <ul>
      {managers.length === 0 && (
        <p className="mt-4 text-center">チケットスケジュールはありません</p>
      )}
      {managers.map((manager) => (
        <div key={manager.id} className="mt-2">
          <ManagerCard
            manager={manager}
            ticket={
              tickets.find(
                (ticket) => ticket.id === manager.ticketId
              ) as UnionNullToUndefined<Ticket>
            }
          />
        </div>
      ))}
    </ul>
  );
}
