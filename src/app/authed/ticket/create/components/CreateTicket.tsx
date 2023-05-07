import { TicketForm } from "~/app/authed/ticket/create/components/TicketForm";
import { getUserInfo } from "~/lib/auth/getUser";
import { createCaller } from "~/servers";

export const CreateTicket = async () => {
  const caller = await createCaller();
  const user = await caller.user.loggedInUser();
  const users = !user?.groupId
    ? []
    : await caller.user.byGroup({ groupId: user.groupId });
  return <TicketForm user={user} groupUsers={users} />;
};
