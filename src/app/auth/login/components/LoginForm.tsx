"use client";
import { useRouter } from "next/navigation";
import { Button, Input as TextInput } from "~/components/common";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { useLoginWithEmail } from "~/app/auth/hooks/useLoginWithEmail";
import { useSignup } from "~/app/auth/hooks/useSignup";
import { useInput } from "~/util/form";
import { checkAuthError, getMessageFromErrorCode } from "~/lib/auth/authError";

export const LoginForm = () => {
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const login = useLoginWithEmail();
  const router = useRouter();
  const { toast } = useToast();

  const onClickButton = async (e: any) => {
    e.preventDefault();
    const result = await login(emailInput.value, passwordInput.value);
    if (checkAuthError(result)) {
      toast({
        toastType: "error",
        description: getMessageFromErrorCode(result.code),
      });
      return;
    }
    router.push("/authed/profile");
  };
  const signup = useSignup();
  const onClickButtonSignup = async (e: any) => {
    e.preventDefault();
    await signup(emailInput.value, passwordInput.value);
  };
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">メールアドレス</Label>
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="メールアドレスを入力してください"
          required={true}
          {...emailInput}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">パスワード</Label>
        </div>
        <TextInput
          id="password"
          type="password"
          required={true}
          {...passwordInput}
        />
      </div>
      <Button type="submit" onClick={onClickButton}>
        ログイン
      </Button>
      <Button type="submit" onClick={onClickButtonSignup}>
        新規登録
      </Button>
    </form>
  );
};
