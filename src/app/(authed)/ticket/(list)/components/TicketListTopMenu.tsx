"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TicketListTopMenu = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center justify-end">
      {pathName === "/ticket/history" && (
        <Link href="/ticket/hold">所持チケットを表示する</Link>
      )}
      {pathName === "/ticket/hold" && (
        <Link href="/ticket/history">使用履歴を表示する</Link>
      )}
    </div>
  );
};
