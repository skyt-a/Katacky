import { TicketForm } from "~/app/(authed)/ticket/create/components/TicketForm";
import { getUserInfo } from "~/lib/auth/getUser";
import { rsc } from "~/lib/trpc/server/trpc";

export const CreateTicket = async () => {
  const user = await getUserInfo();
  const users = !user?.groupId
    ? []
    : await rsc.user.byGroup.fetch({ groupId: user.groupId });
  return <TicketForm user={user} groupUsers={users} />;
};
