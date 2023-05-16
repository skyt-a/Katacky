"use client";
import { isSupported } from "firebase/messaging";
import { useEffect, useState } from "react";
import { Button } from "~/components/common";
import { Label } from "~/components/common/label";
import { Switch } from "~/components/common/switch";
import { requestForToken } from "~/lib/firebase/fcm";

export const ProfileSetting = () => {
  const [notice, setNotice] = useState(false);
  const [isSupportedMessage, setIsSupportedMessage] = useState<boolean>(false);
  useEffect(() => {
    setNotice(Notification.permission === "granted");
    isSupported().then((isSupportedThis) => {
      setIsSupportedMessage(isSupportedThis);
    });
  }, []);
  useEffect(() => {}, []);
  const onCheckChange = async () => {
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      const token = requestForToken(isSupportedMessage);
      if (!token) {
        setNotice(true);
      }
    }
  };
  return (
    <div>
      <Label>通知設定</Label>
      {!notice ? (
        <Button onClick={onCheckChange} className="w-full">
          オンにする
        </Button>
      ) : (
        <div>オン(オフにする場合はブラウザの設定で変更してください)</div>
      )}
    </div>
  );
};
