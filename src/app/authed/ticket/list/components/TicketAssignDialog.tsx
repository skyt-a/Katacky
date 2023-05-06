"use client";
import { Ticket, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useUsersInTargetGroup } from "~/hooks/domain/useUsersInTargetGroup";
import { trpc } from "~/lib/trpc/connectNext";
import { UnionNullToUndefined } from "~/util/types";

type TicketAssignDialogProps = {
  user: User;
  ticket: UnionNullToUndefined<Ticket>;
};

export const TicketAssignDialog = ({
  ticket,
  user,
}: TicketAssignDialogProps) => {
  const router = useRouter();
  const { data: users } = useUsersInTargetGroup(user?.groupId);
  const sendTicket = trpc.ticket.send.useMutation();
  const [userId, setUserId] = useState<string>();
  const onClickSendTicket = async () => {
    if (!ticket.id) {
      return;
    }
    await sendTicket.mutateAsync({ id: ticket.id, userId: Number(userId) });
    router.refresh();
  };

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
                {users
                  ?.filter((u) => user.id !== u.id)
                  .map((user) => (
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
