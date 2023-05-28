"use client";
import { isSupported } from "firebase/messaging";
import { useEffect, useState } from "react";
import { Button } from "~/components/common";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { requestForToken, updateToken } from "~/lib/firebase/fcm";

export const ProfileSetting = () => {
  const { toast } = useToast();
  const [notice, setNotice] = useState(false);
  const [isSupportedMessage, setIsSupportedMessage] = useState<boolean>(false);
  useEffect(() => {
    setNotice(Notification.permission === "granted");
    isSupported().then((isSupportedThis) => {
      setIsSupportedMessage(isSupportedThis);
    });
  }, []);
  useEffect(() => {}, []);
  const onClickUpdateToken = async () => {
    await updateToken();
    toast({
      toastType: "info",
      description: "トークンを更新しました",
    });
  };
  const onCheckChange = async () => {
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      const token = await requestForToken(isSupportedMessage);
      if (!token) {
        setNotice(true);
      }
    }
  };

  return (
    <div>
      <Label>通知設定</Label>
      {!notice ? (
        <Button type="button" onClick={onCheckChange} className="w-full">
          オンにする
        </Button>
      ) : (
        <>
          <div>オン(オフにする場合はブラウザの設定で変更してください)</div>
          <Button type="button" onClick={onClickUpdateToken} className="w-full">
            トークンを更新する(通知が届かない時に押してください)
          </Button>
        </>
      )}
    </div>
  );
};
