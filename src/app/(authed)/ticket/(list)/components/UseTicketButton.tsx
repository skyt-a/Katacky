import { Ticket as TicketType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { useTicket } from "~/servers/ticket/mutation";
import { UnionNullToUndefined } from "~/util/types";

type UseTicketButtonProps = {
  ticket: UnionNullToUndefined<TicketType>;
  onUseSuccess: () => void;
};

export const UseTicketButton = ({
  ticket,
  onUseSuccess,
}: UseTicketButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [, startTransition] = useTransition();

  const onClickUseTicket = () =>
    startTransition(() => {
      if (!ticket.id) {
        return;
      }
      serverActionHandler(useTicket(ticket.id), () => {
        toast({
          toastType: "info",
          description: "チケット🎫を使用しました",
        });
        onUseSuccess();
        router.refresh();
      });
    });

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
