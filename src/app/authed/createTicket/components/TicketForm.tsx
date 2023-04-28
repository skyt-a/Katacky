"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input as TextInput } from "~/components/common";
import { CalendarDatePicker } from "~/components/common/datePicker";
import { Label } from "~/components/common/label";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { useLoginWithEmail } from "~/lib/auth/hooks/useLoginWithEmail";
import { useSignup } from "~/lib/auth/hooks/useSignup";
import { ph, useInput } from "~/util/form";

export const TicketForm = () => {
  const titleInput = useInput("");
  const messageInput = useInput("");
  const colorInput = useInput<`#${string}`>("#ffffff");
  const toNameInput = useInput("");
  const [expireDate, setExpireDate] = useState<Date>();

  const onClickButton = async (e: any) => {
    e.preventDefault();
    // await login(emailInput.value, passwordInput.value);
    // router.push("/authed/profile");
  };
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
        <CalendarDatePicker value={expireDate} onChange={setExpireDate} />
      </div>
      <Ticket
        to={ph(toNameInput.value, "宛先が入ります")}
        title={ph(titleInput.value, "タイトルが入ります")}
        message={ph(messageInput.value, "メッセージが入ります")}
        backgroundColor={colorInput.value}
      />
      <Button type="submit" onClick={onClickButton}>
        チケット作成
      </Button>
    </form>
  );
};
