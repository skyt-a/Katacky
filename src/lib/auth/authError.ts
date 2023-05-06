import { FirebaseError } from "firebase/app";
import { P, match } from "ts-pattern";

export type TAuthError = { error: boolean; description: string; code: string };

export const checkAuthError = (target: any): target is TAuthError => {
  return target?.error;
};

export const getMessageFromErrorCodeOnLogin = (code: TAuthError["code"]) => {
  return match(code)
    .with(
      P.union("auth/user-not-found", "auth/wrong-password"),
      () => "メールアドレスまたはパスワードが間違っています"
    )
    .with("auth/user-disabled", () => "アカウントが無効化されています")
    .with(
      "auth/too-many-requests",
      () =>
        "パスワードを5回以上間違えました。しばらく時間をおいてから再度お試しください"
    )
    .with("auth/invalid-email", () => "メールアドレスの形式が正しくありません")
    .otherwise(() => "予期せぬエラーが発生しました");
};

export const getMessageFromErrorCodeOnSendResetPass = (
  code: TAuthError["code"]
) => {
  return match(code)
    .with(
      "auth/user-not-found",
      () => "そのメールアドレスではユーザーは登録されていません"
    )
    .with("auth/user-disabled", () => "アカウントが無効化されています")
    .with("auth/invalid-email", () => "メールアドレスの形式が正しくありません")
    .otherwise(() => "予期せぬエラーが発生しました");
};

export const getMessageFromErrorCodeOnSignup = (code: TAuthError["code"]) => {
  return match(code)
    .with(
      P.union("auth/email-already-exists", "auth/email-already-in-use"),
      () => "そのメールアドレスではすでにユーザーが登録されています"
    )
    .with("auth/invalid-email", () => "メールアドレスの形式が正しくありません")
    .otherwise(() => "予期せぬエラーが発生しました");
};

export const handleFirebaseAuthError = (
  error: unknown,
  handleCode: (code: TAuthError["code"]) => string
) => {
  if (error instanceof FirebaseError) {
    return {
      error: true,
      description: handleCode(error.code),
      code: error.code,
    };
  }
  throw error;
};
