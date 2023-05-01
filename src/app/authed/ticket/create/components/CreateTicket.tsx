import { TicketForm } from "~/app/authed/ticket/create/components/TicketForm";
import { getUserInfo } from "~/lib/auth/getUser";

export const CreateTicket = async () => {
  const user = await getUserInfo();
  return <TicketForm user={user} />;
};
