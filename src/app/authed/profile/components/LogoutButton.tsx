"use client";
import { Button } from "~/components/common";
import { useLogout } from "~/lib/auth/hooks/useLogout";

export const LogoutButton = () => {
  const logout = useLogout();
  return (
    <Button
      className="bg-primary hover:primary text-white font-bold py-2 px-4 rounded"
      onClick={logout}
    >
      ログアウト
    </Button>
  );
};
