"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/common";
import { Label } from "~/components/common/label";
import { Switch } from "~/components/common/switch";

export const ProfileSetting = () => {
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    setNotice(Notification.permission === "granted");
  }, []);
  const onCheckChange = async () => {
    if (notice) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
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
