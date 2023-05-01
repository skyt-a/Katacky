"use client";
import { Ticket as TicketType } from "@prisma/client";
import { Suspense } from "react";
import { TicketAssignDialog } from "~/app/authed/ticket/list/components/TicketAssignDialog";
import { Button } from "~/components/common";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { trpc } from "~/lib/trpc/connectNext";
import { UnionNullToUndefined } from "~/util/types";

type TicketPopupContentProps = {
  ticket: UnionNullToUndefined<TicketType>;
};

export const TicketPopupContent = ({ ticket }: TicketPopupContentProps) => {
  const useTicket = trpc.ticket.use.useMutation();
  const onClickUseTicket = async () => {
    if (!ticket.id) {
      return;
    }
    await useTicket.mutateAsync({ id: ticket.id });
  };
  return (
    <div>
      <div>
        <Ticket {...ticket} />
      </div>
      {!ticket.isUsed && (
        <>
          <Button type="button" className="w-full" onClick={onClickUseTicket}>
            チケットを使う
          </Button>
          <Suspense fallback={<p>Loading...</p>}>
            <TicketAssignDialog ticket={ticket} />
          </Suspense>
        </>
      )}
    </div>
  );
};
