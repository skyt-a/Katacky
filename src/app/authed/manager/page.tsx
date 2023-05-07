import { Ticket } from "@prisma/client";
import { ManagerCard } from "~/app/authed/manager/components/ManagerCard";
import { createCaller } from "~/servers";
import { UnionNullToUndefined } from "~/util/types";

export default async function ManagerPage() {
  const caller = await createCaller();
  const managers = await caller.ticketManager.list();
  const tickets = await caller.ticket.listByIds({
    ids: managers.map((manager) => manager.ticketId),
  });

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
