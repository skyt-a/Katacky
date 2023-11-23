import { Suspense } from "react";
import { CreateTicket } from "~/app/(authed)/ticket/create/_components/CreateTicket";
import { LoadingSpinner } from "~/components/layout/LoadingSpinner";

export default function CreateTicketPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {}
      <CreateTicket />
    </Suspense>
  );
}
