import { Suspense } from "react";
import { CreateTicket } from "~/app/authed/ticket/create/components/CreateTicket";
import { Profile } from "~/app/authed/profile/components/Profile";
import { Spinner } from "~/components/common/spinner";

export default function CreateTicketPage() {
  return (
    <Suspense fallback={<Spinner />}>
      {/** @ts-expect-error Async Component  */}
      <CreateTicket />
    </Suspense>
  );
}
