import { TicketList } from "~/app/(authed)/ticket/(list)/components/TicketList";
import "./ticketAnimation.css";
import { rsc } from "~/lib/trpc/server/trpc";
import { HydrateClient } from "~/lib/trpc/client/HydrateClient";

export const TicketListWrapper = async () => {
  const [tickets, group] = await Promise.all([
    rsc.ticket.holdList.fetch(),
    rsc.group.group.fetch(),
  ]);
  const users = !group
    ? []
    : await rsc.user.byGroup.fetch({ groupId: group.id });
  return (
    <HydrateClient state={await rsc.dehydrate()}>
      <TicketList tickets={tickets ?? []} groupUsers={users} />
    </HydrateClient>
  );
};
