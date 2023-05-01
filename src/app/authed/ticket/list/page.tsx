import { TicketList } from "~/app/authed/ticket/list/components/TicketList";

export default function TicketListPage() {
  /** @ts-expect-error Async Component  */
  return <TicketList />;
}
