import { TicketHistory } from "~/app/(authed)/ticket/(list)/components/TicketHistory";

export default function TicketListHoldPage() {
  /** @ts-expect-error Async Component  */
  return <TicketHistory />;
}
