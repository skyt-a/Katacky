import { User } from "@prisma/client";
import { TicketForm } from "~/app/(authed)/ticket/create/_components/TicketForm";
import { getLoginUser, getUserByGroup } from "~/servers/user/query";

export const CreateTicket = async () => {
  const user = await getLoginUser();
  const users = !user?.groupId
    ? ([] as User[])
    : await getUserByGroup(user.groupId);
  return <TicketForm user={user} groupUsers={users} />;
};
