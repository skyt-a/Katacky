"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { GroupIcon } from "~/components/icons/group";
import { PlusIcon } from "~/components/icons/plus";
import { ProfileIcon } from "~/components/icons/profile";
import { TicketIcon } from "~/components/icons/ticket";
import { TimerIcon } from "~/components/icons/timer";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export default function Menu() {
  const router = useRouter();
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-secondary border border-gray-200 rounded-full bottom-4 left-1/2">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <MenuLink href="/authed/manager">
          <TimerIcon />
          <span className="sr-only">チケットスケジュール一覧</span>
        </MenuLink>
        <MenuLink href="/authed/ticket/list">
          <TicketIcon />
          <span className="sr-only">チケット一覧</span>
        </MenuLink>

        <div className="flex items-center justify-center">
          <Link
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary text-secondary rounded-full hover:bg-primary group focus:ring-4 focus:ring-secondary-300 focus:outline-none"
            href="/authed/ticket/create"
          >
            <PlusIcon />
            <span className="sr-only">チケット作成</span>
          </Link>
        </div>
        <MenuLink href="/authed/groups">
          <GroupIcon />
          <span className="sr-only">グループ</span>
        </MenuLink>
        <MenuLink href="/authed/profile">
          <ProfileIcon />
          <span className="sr-only">プロフィール</span>
        </MenuLink>
      </div>
    </div>
  );
}

const MenuLink = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  return (
    <Link
      className="inline-flex flex-col items-center justify-center px-5 rounded-l-full group text-primary"
      href={href}
    >
      {children}
    </Link>
  );
};
