"use client";
import { User } from "@prisma/client";
import { isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ScheduleForm } from "~/app/(authed)/ticket/create/components/ScheduleForm";
import { Button, Input as TextInput } from "~/components/common";
import { CalendarDatePicker } from "~/components/common/datePicker";
import { Sheet, SheetContent, SheetTrigger } from "~/components/common/sheet";
import { useToast } from "~/components/common/use-toast";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { LoadingSpinner } from "~/components/layout/LoadingSpinner";
import { trpc } from "~/lib/trpc/connectNext";
import { ph, setDateDayEnd, useInput } from "~/util/form";
import { ticketFormLength } from "~/util/setting";

type TicketFormProps = {
  user: User | null;
  groupUsers: User[];
};

export const TicketForm = ({ user, groupUsers }: TicketFormProps) => {
  const router = useRouter();
  const titleInput = useInput("");
  const messageInput = useInput("");
  const colorInput = useInput<`#${string}`>("#ffffff");
  const fromNameInput = useInput(user?.name ?? "");
  const toNameInput = useInput("");
  const [expiredDate, setExpiredDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();

  const { toast } = useToast();
  const createTicketMutation = trpc.ticket.create.useMutation();
  const createTicket = async (isScheduled = false) => {
    if (!user) {
      return;
    }
    if (expiredDate && isBefore(expiredDate, new Date())) {
      toast({
        toastType: "error",
        description: "有効期限が過去になっています",
      });
      return;
    }
    if (startDate && isBefore(startDate, new Date())) {
      toast({
        toastType: "error",
        description: "利用開始日時が過去になっています",
      });
      return;
    }
    if (expiredDate && startDate && isBefore(expiredDate, startDate)) {
      toast({
        toastType: "error",
        description: "利用開始日時が有効期限より後になっています",
      });
      return;
    }
    const ticket = await createTicketMutation.mutateAsync({
      title: titleInput.value,
      message: messageInput.value,
      backgroundColor: colorInput.value,
      expiredDate: expiredDate,
      availableDateFrom: startDate,
      creatorId: user?.id,
      from: fromNameInput.value,
      to: toNameInput.value,
      holderId: user?.id,
      isScheduled,
    });
    if (!ticket) {
      throw new Error("チケットの作成に失敗しました");
    }
    return ticket;
  };
  const onClickButton = async (e: any) => {
    e.preventDefault();
    await createTicket();
    toast({
      toastType: "info",
      description: "チケットを作成しました",
    });
    router.refresh();
    router.push("/ticket/list");
  };
  const isDisabledButton =
    titleInput.value.length === 0 ||
    !user ||
    fromNameInput.value.length === 0 ||
    toNameInput.value.length === 0 ||
    messageInput.value.length === 0 ||
    colorInput.value.length === 0;
  return (
    <form className="flex flex-col gap-4">
      <FormControlWrapper label="宛先" id="to">
        <TextInput
          id="to"
          type="text"
          placeholder={`宛先を入力してください(${ticketFormLength.to}文字以内)`}
          required={true}
          maxLength={ticketFormLength.to}
          {...toNameInput}
        />
      </FormControlWrapper>
      <FormControlWrapper id="from" label="送り主" className="mt-2">
        <TextInput
          id="from"
          type="text"
          placeholder={`送り主を入力してください(${ticketFormLength.from}文字以内)`}
          required={true}
          maxLength={ticketFormLength.from}
          {...fromNameInput}
        />
      </FormControlWrapper>
      <FormControlWrapper label="タイトル" id="title" className="mt-2">
        <TextInput
          id="title"
          type="text"
          placeholder={`タイトルを入力してください(${ticketFormLength.title}文字以内)`}
          maxLength={ticketFormLength.title}
          required={true}
          {...titleInput}
        />
      </FormControlWrapper>
      <FormControlWrapper id="message" label="メッセージ" className="mt-2">
        <TextInput
          id="message"
          type="text"
          placeholder={`メッセージを入力してください(${ticketFormLength.message}文字以内)`}
          maxLength={ticketFormLength.message}
          required={true}
          {...messageInput}
        />
      </FormControlWrapper>
      <FormControlWrapper id="color" label="背景色" className="mt-2">
        <TextInput id="color" type="color" required={true} {...colorInput} />
      </FormControlWrapper>
      <FormControlWrapper id="expired" label="有効期限" className="mt-2">
        <CalendarDatePicker
          id="expired"
          value={expiredDate}
          onChange={setDateDayEnd(setExpiredDate)}
          placeHolder="有効期限を選択してください"
          fromDate={new Date()}
        />
      </FormControlWrapper>
      <FormControlWrapper id="startDate" label="利用開始日" className="mt-2">
        <CalendarDatePicker
          id="startDate"
          value={startDate}
          onChange={setDateDayEnd(setStartDate)}
          placeHolder="利用開始日時を選択してください"
          fromDate={new Date()}
        />
      </FormControlWrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <Ticket
          to={ph(toNameInput.value, "宛先が入ります")}
          title={ph(titleInput.value, "タイトルが入ります")}
          message={ph(messageInput.value, "メッセージが入ります")}
          backgroundColor={colorInput.value}
          from={user?.name ?? ""}
          expiredDate={expiredDate}
        />
      </Suspense>

      <Button type="submit" onClick={onClickButton} disabled={isDisabledButton}>
        チケット作成
      </Button>
      <Sheet>
        <SheetTrigger
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          disabled={isDisabledButton || !Boolean(user?.groupId)}
        >
          このチケットをスケジュール発行する
        </SheetTrigger>
        <SheetContent position="bottom" size="content">
          <ScheduleForm createTicket={createTicket} users={groupUsers} />
        </SheetContent>
      </Sheet>
    </form>
  );
};
