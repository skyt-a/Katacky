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
import { trpc } from "~/lib/trpc/client/connectNext";
import { manageTypeToText } from "~/util/setting";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/common/use-toast";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";

type ScheduleFormProps = {
  users: User[];
  createTicket: (isScheduled: boolean) => Promise<Ticket | undefined>;
};

export const ScheduleForm = ({ createTicket, users }: ScheduleFormProps) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>(
    TicketManageType.ONCE_MONTH
  );
  const countInput = useInput(1);
  const nameInput = useInput("");
  const [userId, setUserId] = useState<string>();

  const createTicketManager = trpc.ticketManager.create.useMutation();
  const { toast } = useToast();
  const onConfirm = async () => {
    const ticket = await createTicket(true);
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
    toast({
      toastType: "info",
      description: "チケットスケジュールを作成しました",
    });
    router.refresh();
    router.push("/manager");
  };
  return (
    <form className="flex flex-col gap-4">
      <FormControlWrapper id="name" label="スケジュール名">
        <Input id="name" type="text" {...nameInput} />
      </FormControlWrapper>
      <FormControlWrapper
        id="retrieve"
        label="受け取るユーザー"
        className="mt-2"
      >
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
      </FormControlWrapper>
      <FormControlWrapper id="frequency" label="発行頻度" className="mt-2">
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
      </FormControlWrapper>
      <FormControlWrapper id="count" label="1回の発行枚数" className="mt-2">
        <Input id="count" type="number" {...countInput} />
      </FormControlWrapper>
      <Button type="button" className="w-full mt-2" onClick={onConfirm}>
        スケジュール確定
      </Button>
    </form>
  );
};
