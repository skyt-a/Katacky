import { Ticket } from "@prisma/client";
import { ManagerCard } from "~/app/(authed)/manager/components/ManagerCard";
import { UnionNullToUndefined } from "~/util/types";
import { rsc } from "~/lib/trpc/server/trpc";

export default async function ManagerPage() {
  const managers = await rsc.ticketManager.list.fetch();
  const tickets = await rsc.ticket.listByIds.fetch({
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
