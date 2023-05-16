"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common";
import { useLogout } from "~/app/auth/hooks/useLogout";

export const LogoutButton = () => {
  const logout = useLogout();
  const router = useRouter();
  const onLogout = async () => {
    await logout();
    globalThis.location.href = "/auth/login";
  };
  return (
    <Button className="w-full" onClick={onLogout}>
      ログアウト
    </Button>
  );
};
