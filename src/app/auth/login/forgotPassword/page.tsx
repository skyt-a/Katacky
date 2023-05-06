"use client";
import { useRouter } from "next/navigation";
import { useSendPassResetMail } from "~/app/auth/hooks/useSendPassResetMail";
import { Button, Input as TextInput } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";
import { checkAuthError } from "~/lib/auth/authError";
import { useInput } from "~/util/form";

export default function ForgotPasswordPage() {
  const emailInput = useInput("");
  const { toast } = useToast();
  const sendPasswordResetEmail = useSendPassResetMail();
  const onClick = async () => {
    const result = await sendPasswordResetEmail(emailInput.value);
    if (checkAuthError(result)) {
      toast({
        toastType: "error",
        description: result.description,
      });
      return;
    }
    toast({
      toastType: "info",
      description: "パスワード変更メールを送信しました",
    });
  };

  const router = useRouter();
  const onClickReturn = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <FormControlWrapper label="メールアドレス" id="email">
        <TextInput
          id="email"
          type="email"
          placeholder="メールアドレスを入力してください"
          required={true}
          {...emailInput}
        />
      </FormControlWrapper>
      <Button onClick={onClick} className="w-full mt-4">
        パスワード変更メールを送信する
      </Button>
      <Button
        variant="secondary"
        onClick={onClickReturn}
        className="w-full mt-2"
      >
        ログイン画面に戻る
      </Button>
    </div>
  );
}
