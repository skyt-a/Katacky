import { Ticket, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "~/components/common";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/common/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/common/select";
import { useToast } from "~/components/common/use-toast";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { sendTicket } from "~/servers/ticket/mutation";
import { UnionNullToUndefined } from "~/util/types";

type AssignTicketButtonProps = {
  users: User[];
  ticket: UnionNullToUndefined<Ticket>;
  onAssignSuccess: () => void;
};

export const AssignTicketButton = ({
  ticket,
  users,
  onAssignSuccess,
}: AssignTicketButtonProps) => {
  const [userId, setUserId] = useState<string>();
  const { toast } = useToast();
  const [, startTransition] = useTransition();
  const session = useSession();

  const router = useRouter();
  const onClickSendTicket = () =>
    startTransition(() => {
      if (!ticket.id) {
        return;
      }
      const user = users.find((u) => u.id === session.data?.user.userInfoId);
      if (!user) {
        return;
      }
      serverActionHandler(sendTicket(user, ticket.id, Number(userId)), () => {
        toast({
          toastType: "info",
          description: "チケットを送信しました",
        });
        onAssignSuccess();
        router.refresh();
      });
    });

  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full"
        disabled={!users || users.length === 0}
      >
        チケットを送る
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>チケットの送り先を選択してください</DialogTitle>
          <DialogDescription>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="送り先" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              className="w-full mt-4"
              onClick={onClickSendTicket}
            >
              送信する
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
