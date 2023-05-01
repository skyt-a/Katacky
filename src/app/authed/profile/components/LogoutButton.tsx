"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common";
import { useLogout } from "~/lib/auth/hooks/useLogout";

export const LogoutButton = () => {
  const logout = useLogout();
  const router = useRouter();
  const onLogout = () => {
    logout();
    router.push("/auth/login");
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
