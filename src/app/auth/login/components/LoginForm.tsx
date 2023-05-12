"use client";
import { useRouter } from "next/navigation";
import { Button, Input as TextInput } from "~/components/common";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { useLoginWithEmail } from "~/app/auth/hooks/useLoginWithEmail";
import { useSignup } from "~/app/auth/hooks/useSignup";
import { useInput } from "~/util/form";
import { checkAuthError } from "~/lib/auth/authError";
import Link from "next/link";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";
import { ZodError, z } from "zod";
import { passwordSchema } from "~/util/setting";

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
        description: result.description,
      });
      return;
    }
    router.push("/profile");
  };
  const signup = useSignup();
  const onClickButtonSignup = async (e: any) => {
    e.preventDefault();
    try {
      passwordSchema.parse(passwordInput.value);
    } catch (e) {
      if (e instanceof ZodError) {
        toast({
          toastType: "error",
          description: e.errors[0].message,
        });
        return;
      }
    }
    const result = await signup(emailInput.value, passwordInput.value);
    if (checkAuthError(result)) {
      toast({
        toastType: "error",
        description: result.description,
      });
      return;
    }
    toast({
      toastType: "info",
      description: "ユーザー仮登録が完了しました。",
    });
    await login(emailInput.value, passwordInput.value);
    router.push("/auth/createUser");
  };
  return (
    <form className="flex flex-col gap-4">
      <FormControlWrapper label="メールアドレス" id="email">
        <TextInput
          id="email"
          type="email"
          placeholder="メールアドレスを入力してください"
          required={true}
          {...emailInput}
        />
      </FormControlWrapper>
      <FormControlWrapper label="パスワード" id="password" className="mt-2">
        <TextInput
          id="password"
          type="password"
          required={true}
          {...passwordInput}
        />
      </FormControlWrapper>
      <Button type="submit" onClick={onClickButton}>
        ログイン
      </Button>
      <Button type="submit" onClick={onClickButtonSignup}>
        新規登録
      </Button>
      <p className="text-center mt-2">
        ログインパスワードを忘れた方は
        <Link href="/auth/login/forgotPassword" className="underline">
          こちら
        </Link>
      </p>
    </form>
  );
};
