"use client";
import { Ticket as TicketType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { trpc } from "~/lib/trpc/connectNext";
import { UnionNullToUndefined } from "~/util/types";

type UseTicketButtonProps = {
  ticket: UnionNullToUndefined<TicketType>;
};

export const UseTicketButton = ({ ticket }: UseTicketButtonProps) => {
  const router = useRouter();
  const useTicket = trpc.ticket.use.useMutation();
  const { toast } = useToast();
  const onClickUseTicket = async () => {
    if (!ticket.id) {
      return;
    }
    await useTicket.mutateAsync({ id: ticket.id });
    toast({
      toastType: "info",
      description: "チケット🎫を使用しました",
    });
    router.refresh();
    router.push("/ticket/list");
  };
  return (
    <>
      {!ticket.isUsed && (
        <Button type="button" className="w-full" onClick={onClickUseTicket}>
          チケットを使う
        </Button>
      )}
    </>
  );
};
