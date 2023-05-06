"use client";
import { Ticket as TicketType, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { TicketAssignDialog } from "~/app/authed/ticket/list/components/TicketAssignDialog";
import { Button } from "~/components/common";
import { trpc } from "~/lib/trpc/connectNext";
import { UnionNullToUndefined } from "~/util/types";

type TicketPopupContentProps = {
  ticket: UnionNullToUndefined<TicketType>;
  user: User;
};

export const TicketPopupContent = ({
  ticket,
  user,
}: TicketPopupContentProps) => {
  const router = useRouter();
  const utils = trpc.useContext();
  const useTicket = trpc.ticket.use.useMutation({
    onSuccess: async () => {
      await utils.ticket.invalidate();
    },
  });
  const onClickUseTicket = async () => {
    if (!ticket.id) {
      return;
    }
    await useTicket.mutateAsync({ id: ticket.id });
    router.refresh();
  };
  return (
    <div>
      {!ticket.isUsed && (
        <>
          <Button type="button" className="w-full" onClick={onClickUseTicket}>
            チケットを使う
          </Button>
          <Suspense fallback={<p>Loading...</p>}>
            <TicketAssignDialog ticket={ticket} user={user} />
          </Suspense>
        </>
      )}
    </div>
  );
};
