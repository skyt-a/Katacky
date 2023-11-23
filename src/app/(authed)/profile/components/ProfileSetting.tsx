"use client";
import { isSupported } from "firebase/messaging";
import { useEffect, useState } from "react";
import { Button } from "~/components/common";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { requestForToken, updateToken } from "~/lib/firebase/fcm";

export const ProfileSetting = () => {
  const { toast } = useToast();
  const [notice, setNotice] = useState("");
  const [isSupportedMessage, setIsSupportedMessage] = useState<boolean>(false);
  useEffect(() => {
    setNotice(Notification.permission);
    isSupported().then((isSupportedThis) => {
      setIsSupportedMessage(isSupportedThis);
    });
  }, []);
  const onClickUpdateToken = async () => {
    const token = await updateToken();
    if (token) {
      toast({
        toastType: "info",
        description: "トークンを更新しました",
      });
    } else {
      toast({
        toastType: "error",
        description: "トークンの更新に失敗しました",
      });
    }
  };
  const onCheckChange = async () => {
    debugger;
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      const [token, status] =
        (await requestForToken(isSupportedMessage, true)) ?? [];
      if (token) {
        setNotice(status);
      }
    }
  };

  return (
    <div>
      <Label>通知設定</Label>
      <div className="mt-2">
        {notice === "denied" && (
          <div>
            通知権限が拒否されています。通知をオンにしたい場合は以下の手順に従ってください。
            <ol>
              <li>1. アプリ・ブラウザの設定で変更</li>
              <li>2. ヘッダーの更新ボタンを押下</li>
              <li>3. トークンを更新するボタンを押下</li>
            </ol>
          </div>
        )}
        {notice === "default" && (
          <Button type="button" onClick={onCheckChange} className="w-full">
            オンにする
          </Button>
        )}
        {notice === "granted" && (
          <>
            <div>
              オン(オフにする場合はアプリ・ブラウザの設定で変更してください)
            </div>
            <Button
              type="button"
              onClick={onClickUpdateToken}
              className="w-full mt-4"
            >
              トークンを更新する
            </Button>
            <div className="text-xs mt-2">
              ※通知が届かない時に押してください
            </div>
          </>
        )}
      </div>
    </div>
  );
};
