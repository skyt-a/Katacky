import { Ticket } from "@prisma/client";
import { redirect } from "next/navigation";
import { ManagerCard } from "~/app/authed/manager/components/ManagerCard";
import { getUserInfo } from "~/lib/auth/getUser";
import { prisma } from "~/lib/prisma";
import { UnionNullToUndefined } from "~/util/types";

export default async function ManagerPage() {
  const user = await getUserInfo();
  if (!user) {
    redirect("/auth/login");
  }
  const managers = await prisma.ticketManager.findMany({
    where: { creatorId: user?.id },
  });
  const tickets = await prisma.ticket.findMany({
    where: { OR: managers.map((manager) => ({ id: manager.ticketId })) },
  });

  return (
    <ul>
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
