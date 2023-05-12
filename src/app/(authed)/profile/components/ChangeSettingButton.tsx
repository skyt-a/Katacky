"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common";

export const ChangeSettingButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/profile/changeSetting");
  };
  return (
    <Button className="w-full" onClick={onClick}>
      設定変更
    </Button>
  );
};
