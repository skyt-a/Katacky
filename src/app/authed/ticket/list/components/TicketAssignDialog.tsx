"use client";
import { Ticket, User } from "@prisma/client";
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
  const { data: users } = trpc.user.byGroup.useQuery(
    {
      groupId: user?.groupId!,
    },
    { enabled: Boolean(user?.groupId) }
  );
  const sendTicket = trpc.ticket.send.useMutation();
  const [userId, setUserId] = useState<string>();
  const onClickSendTicket = async () => {
    if (!ticket.id) {
      return;
    }
    await sendTicket.mutateAsync({ id: ticket.id, userId: Number(userId) });
  };

  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="mt-4 flex justify-center w-full"
        disabled={!users || users.length === 0}
      >
        チケットを送る
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>チケットの送り先を選択してください</DialogTitle>
          <DialogDescription>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              className="w-full mt-2"
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
