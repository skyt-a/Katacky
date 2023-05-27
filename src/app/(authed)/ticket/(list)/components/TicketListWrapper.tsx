import { TicketList } from "~/app/(authed)/ticket/(list)/components/TicketList";
import "./ticketAnimation.css";
import { ticketHolds } from "~/servers/ticket/query";
import { getGroup } from "~/servers/group/query";
import { getUserByGroup } from "~/servers/user/query";

export const TicketListWrapper = async () => {
  const [tickets, group] = await Promise.all([ticketHolds(), getGroup()]);
  const users = !group ? [] : await getUserByGroup(group.id);
  return <TicketList tickets={tickets} groupUsers={users} />;
};

export const revalidate = 1;
