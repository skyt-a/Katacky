import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/common/select";
import { useState } from "react";
import { Ticket, TicketManageType, User } from "@prisma/client";
import { Button, Input } from "~/components/common";
import { useInput } from "~/util/form";
import { Label } from "~/components/common/label";
import { trpc } from "~/lib/trpc/connectNext";
import { useUsersInTargetGroup } from "~/hooks/domain/useUsersInTargetGroup";
import { manageTypeToText } from "~/util/setting";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/common/use-toast";

type ScheduleFormProps = {
  user: User | null;
  createTicket: (isScheduled: boolean) => Promise<Ticket | undefined>;
};

export const ScheduleForm = ({ createTicket, user }: ScheduleFormProps) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>(
    TicketManageType.ONCE_MONTH
  );
  const countInput = useInput(1);
  const nameInput = useInput("");
  const { data: users } = useUsersInTargetGroup(user?.groupId);
  const [userId, setUserId] = useState<string>();

  const util = trpc.useContext();
  const { toast } = useToast();
  const createTicketManager = trpc.ticketManager.create.useMutation({
    onSuccess() {
      toast({
        toastType: "info",
        description: "チケットスケジュールを作成しました",
      });
      util.ticketManager.invalidate();
    },
  });
  const onConfirm = async () => {
    const ticket = await createTicket(true);
    if (!ticket || !user) {
      return;
    }
    await createTicketManager.mutateAsync({
      retrieveUserId: Number(userId),
      type: selectedType as TicketManageType,
      count: Number(countInput.value),
      ticketId: ticket.id,
      name: nameInput.value,
      creatorId: user.id,
    });
    router.push("/authed/manager");
  };
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="count">スケジュール名</Label>
          </div>
          <Input id="count" type="text" {...nameInput} />
        </div>
        <div className="mt-4 mb-2 block">
          <Label htmlFor="frequency">受け取るユーザー</Label>
        </div>
        <Select value={userId} onValueChange={setUserId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4 mb-2 block">
          <Label htmlFor="frequency">発行頻度</Label>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(manageTypeToText).map((type) => (
              <SelectItem key={type} value={type}>
                {manageTypeToText[type as keyof typeof manageTypeToText]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mt-4 mb-2 block">
          <Label htmlFor="count">1回の発行枚数</Label>
        </div>
        <Input id="count" type="number" {...countInput} />
      </div>
      <Button type="button" className="w-full" onClick={onConfirm}>
        スケジュール確定
      </Button>
    </form>
  );
};
