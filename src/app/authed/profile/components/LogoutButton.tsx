"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common";
import { useLogout } from "~/app/auth/hooks/useLogout";

export const LogoutButton = () => {
  const logout = useLogout();
  const router = useRouter();
  const onLogout = async () => {
    console.log("logout");
    await logout();
    globalThis.location.href = "/auth/login";
  };
  return (
    <Button
      className="bg-primary hover:primary text-white font-bold py-2 px-4 rounded"
      onClick={onLogout}
    >
      ログアウト
    </Button>
  );
};
