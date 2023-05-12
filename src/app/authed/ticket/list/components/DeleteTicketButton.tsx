import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { trpc } from "~/lib/trpc/connectNext";

type DeleteTicketButtonProps = {
  selectedTicketId: number;
  onDeleteSuccess: () => void;
};

export const DeleteTicketButton = ({
  selectedTicketId,
  onDeleteSuccess,
}: DeleteTicketButtonProps) => {
  const deleteTicket = trpc.ticket.delete.useMutation();
  const { toast } = useToast();
  const onClickTicketDelete = async (id: number) => {
    await deleteTicket.mutateAsync({ id });
    toast({
      toastType: "info",
      description: "チケットを破棄しました",
    });
    onDeleteSuccess();
  };
  return (
    <Button
      className="w-full mt-2"
      variant="destructive"
      onClick={async (e) => {
        e.stopPropagation();
        await onClickTicketDelete(selectedTicketId);
      }}
    >
      チケットを破棄する
    </Button>
  );
};
