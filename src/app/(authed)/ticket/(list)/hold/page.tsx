import { TicketListWrapper } from "~/app/(authed)/ticket/(list)/components/TicketListWrapper";

export default function TicketListHoldPage() {
  /** @ts-expect-error Async Component  */
  return <TicketListWrapper />;
}

export const revalidate = 0;
