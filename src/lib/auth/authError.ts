import { P, match } from "ts-pattern";

export type TAuthError = { error: boolean; code: string };

export const checkAuthError = (target: any): target is TAuthError => {
  return target.error;
};

export const getMessageFromErrorCode = (code: TAuthError["code"]) => {
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
    .otherwise(() => "予期せぬエラーが発生しました");
};
