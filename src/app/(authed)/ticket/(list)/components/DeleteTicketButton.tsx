import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { deleteTicket } from "~/servers/ticket/mutation";

type DeleteTicketButtonProps = {
  selectedTicketId: number;
  onDeleteSuccess: () => void;
};

export const DeleteTicketButton = ({
  selectedTicketId,
  onDeleteSuccess,
}: DeleteTicketButtonProps) => {
  const { toast } = useToast();
  const [, startTransition] = useTransition();
  const onClickUseTicket = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    startTransition(() => {
      e.stopPropagation();
      serverActionHandler(deleteTicket(selectedTicketId), () => {
        toast({
          toastType: "info",
          description: "チケットを削除しました",
        });
        onDeleteSuccess();
      });
    });
  return (
    <Button
      className="w-full mt-2"
      variant="destructive"
      onClick={onClickUseTicket}
    >
      チケットを破棄する
    </Button>
  );
};
