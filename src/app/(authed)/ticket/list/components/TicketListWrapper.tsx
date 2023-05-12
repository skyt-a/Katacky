import { TicketList } from "~/app/(authed)/ticket/list/components/TicketList";
import "./ticketAnimation.css";
import { rsc } from "~/lib/trpc/server/trpc";
import { getUserInfo } from "~/lib/auth/getUser";

export const TicketListWrapper = async () => {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  const [ticket, group] = await Promise.all([
    rsc.ticket.holdList.fetch(),
    rsc.group.group.fetch(),
  ]);
  const users = !group
    ? []
    : await rsc.user.byGroup.fetch({ groupId: group.id });
  return <TicketList tickets={ticket ?? []} groupUsers={users} />;
};
