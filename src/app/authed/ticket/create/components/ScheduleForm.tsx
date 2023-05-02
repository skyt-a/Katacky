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

type ScheduleFormProps = {
  user: User | null;
  createTicket: () => Promise<Ticket | undefined>;
};

export const ScheduleForm = ({ createTicket, user }: ScheduleFormProps) => {
  const [selectedType, setSelectedType] = useState<string>();
  const countInput = useInput(1);
  const nameInput = useInput("");
  const { data: users } = trpc.user.byGroup.useQuery(
    {
      groupId: user?.groupId!,
    },
    { enabled: Boolean(user?.groupId) }
  );
  const [userId, setUserId] = useState<string>();

  const createTicketManager = trpc.ticketManager.create.useMutation();
  const onConfirm = async () => {
    const ticket = await createTicket();
    if (!ticket) {
      return;
    }
    await createTicketManager.mutateAsync({
      retrieveUserId: Number(userId),
      type: selectedType as TicketManageType,
      count: Number(countInput.value),
      ticketId: ticket.id,
      name: nameInput.value,
    });
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
        <div className="mb-2 block">
          <Label htmlFor="frequency">発行頻度</Label>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TicketManageType.ONCE_DAY}>1日ごと</SelectItem>
            <SelectItem value={TicketManageType.ONCE_WEEK}>
              1週間ごと
            </SelectItem>
            <SelectItem value={TicketManageType.ONCE_MONTH}>
              1ヶ月ごと
            </SelectItem>
            <SelectItem value={TicketManageType.ONCE_DAY}>1年ごと</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
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
