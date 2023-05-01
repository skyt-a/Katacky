"use client";
import { User } from "@prisma/client";
import { Suspense, useState } from "react";
import { Button, Input as TextInput } from "~/components/common";
import { CalendarDatePicker } from "~/components/common/datePicker";
import { Label } from "~/components/common/label";
import { Spinner } from "~/components/common/spinner";
import { useToast } from "~/components/common/use-toast";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { LoadingSpinner } from "~/components/layout/LoadingSpinner";
import { trpc } from "~/lib/trpc/connectNext";
import { ph, useInput } from "~/util/form";

type TicketFormProps = {
  user: User | null;
};

export const TicketForm = (props: TicketFormProps) => {
  const titleInput = useInput("");
  const messageInput = useInput("");
  const colorInput = useInput<`#${string}`>("#ffffff");
  const fromNameInput = useInput(props.user?.name ?? "");
  const toNameInput = useInput("");
  const [expiredDate, setExpiredDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();

  const { toast } = useToast();
  const createTicket = trpc.ticket.create.useMutation();
  const onClickButton = async (e) => {
    e.preventDefault();
    if (!props.user) {
      return;
    }
    const result = await createTicket.mutateAsync({
      title: titleInput.value,
      message: messageInput.value,
      backgroundColor: colorInput.value,
      expiredDate: expiredDate,
      availableDateFrom: startDate,
      creatorId: props.user?.id,
      from: fromNameInput.value,
      to: toNameInput.value,
    });
    toast({
      content: "チケットを作成しました",
    });
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
          placeholder="宛先を入力してください"
          required={true}
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
          placeholder="送り主を入力してください"
          required={true}
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
          placeholder="タイトルを入力してください"
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
          placeholder="メッセージを入力してください"
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
          onChange={setExpiredDate}
          placeHolder="有効期限を選択してください"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="color">利用開始日時</Label>
        </div>
        <CalendarDatePicker
          value={startDate}
          onChange={setStartDate}
          placeHolder="利用開始日時を選択してください"
        />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Ticket
          to={ph(toNameInput.value, "宛先が入ります")}
          title={ph(titleInput.value, "タイトルが入ります")}
          message={ph(messageInput.value, "メッセージが入ります")}
          backgroundColor={colorInput.value}
          from={props.user?.name ?? ""}
        />
      </Suspense>
      <Button type="submit" onClick={onClickButton} disabled={isDisabledButton}>
        チケット作成
      </Button>
    </form>
  );
};
