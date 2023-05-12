import { Ticket as TicketType } from "@prisma/client";
import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { trpc } from "~/lib/trpc/connectNext";
import { UnionNullToUndefined } from "~/util/types";

type UseTicketButtonProps = {
  ticket: UnionNullToUndefined<TicketType>;
  onUseSuccess: () => void;
};

export const UseTicketButton = ({
  ticket,
  onUseSuccess,
}: UseTicketButtonProps) => {
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
    onUseSuccess();
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
