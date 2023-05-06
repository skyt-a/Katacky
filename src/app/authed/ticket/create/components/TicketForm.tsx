"use client";
import { User } from "@prisma/client";
import { isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ScheduleForm } from "~/app/authed/ticket/create/components/ScheduleForm";
import { Button, Input as TextInput } from "~/components/common";
import { CalendarDatePicker } from "~/components/common/datePicker";
import { Label } from "~/components/common/label";
import { Sheet, SheetContent, SheetTrigger } from "~/components/common/sheet";
import { useToast } from "~/components/common/use-toast";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { LoadingSpinner } from "~/components/layout/LoadingSpinner";
import { trpc } from "~/lib/trpc/connectNext";
import { ph, setDateDayEnd, useInput } from "~/util/form";
import { ticketFormLength } from "~/util/setting";

type TicketFormProps = {
  user: User | null;
};

export const TicketForm = (props: TicketFormProps) => {
  const router = useRouter();
  const titleInput = useInput("");
  const messageInput = useInput("");
  const colorInput = useInput<`#${string}`>("#ffffff");
  const fromNameInput = useInput(props.user?.name ?? "");
  const toNameInput = useInput("");
  const [expiredDate, setExpiredDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();

  const { toast } = useToast();
  const utils = trpc.useContext();
  const createTicketMutation = trpc.ticket.create.useMutation({
    onSuccess: async () => {
      toast({
        toastType: "info",
        description: "チケットを作成しました",
      });
      await utils.ticket.invalidate();
    },
  });
  const createTicket = async (isScheduled = false) => {
    if (!props.user) {
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
      creatorId: props.user?.id,
      from: fromNameInput.value,
      to: toNameInput.value,
      holderId: props.user?.id,
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
    router.push("/authed/ticket/list");
  };
  const isDisabledButton =
    titleInput.value.length === 0 ||
    !props.user ||
    fromNameInput.value.length === 0 ||
    toNameInput.value.length === 0 ||
    messageInput.value.length === 0 ||
    colorInput.value.length === 0;
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title">宛先</Label>
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder={`宛先を入力してください(${ticketFormLength.to}文字以内)`}
          required={true}
          maxLength={ticketFormLength.to}
          {...toNameInput}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title">送り主</Label>
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder={`送り主を入力してください(${ticketFormLength.from}文字以内)`}
          required={true}
          maxLength={ticketFormLength.from}
          {...fromNameInput}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title">タイトル</Label>
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder={`タイトルを入力してください(${ticketFormLength.title}文字以内)`}
          maxLength={ticketFormLength.title}
          required={true}
          {...titleInput}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="message">メッセージ</Label>
        </div>
        <TextInput
          id="message"
          type="text"
          placeholder={`メッセージを入力してください(${ticketFormLength.message}文字以内)`}
          maxLength={ticketFormLength.message}
          required={true}
          {...messageInput}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="color">背景色</Label>
        </div>
        <TextInput id="color" type="color" required={true} {...colorInput} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="color">有効期限</Label>
        </div>
        <CalendarDatePicker
          value={expiredDate}
          onChange={setDateDayEnd(setExpiredDate)}
          placeHolder="有効期限を選択してください"
          fromDate={new Date()}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="color">利用開始日時</Label>
        </div>
        <CalendarDatePicker
          value={startDate}
          onChange={setDateDayEnd(setStartDate)}
          placeHolder="利用開始日時を選択してください"
          fromDate={new Date()}
        />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Ticket
          to={ph(toNameInput.value, "宛先が入ります")}
          title={ph(titleInput.value, "タイトルが入ります")}
          message={ph(messageInput.value, "メッセージが入ります")}
          backgroundColor={colorInput.value}
          from={props.user?.name ?? ""}
          expiredDate={expiredDate}
        />
      </Suspense>

      <Button type="submit" onClick={onClickButton} disabled={isDisabledButton}>
        チケット作成
      </Button>
      <Sheet>
        <SheetTrigger
          disabled={isDisabledButton || !Boolean(props.user?.groupId)}
        >
          このチケットをスケジュール発行する
        </SheetTrigger>
        <SheetContent position="bottom" size="content">
          <ScheduleForm createTicket={createTicket} user={props.user} />
        </SheetContent>
      </Sheet>
    </form>
  );
};
