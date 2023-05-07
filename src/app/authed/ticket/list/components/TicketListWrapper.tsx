import { TicketList } from "~/app/authed/ticket/list/components/TicketList";
import "./ticketAnimation.css";
import { getUserInfo } from "~/lib/auth/getUser";
import { createCaller } from "~/servers";

export const TicketListWrapper = async () => {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  const caller = await createCaller();
  const ticket = await caller.ticket.holdList();
  const group = await caller.group.group();
  const users = !group ? [] : await caller.user.byGroup({ groupId: group.id });
  return <TicketList tickets={ticket} groupUsers={users} />;
};
