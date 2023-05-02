"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link
          className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          href="/authed/ticket/list"
        >
          <TimerIcon />
          <span className="sr-only">New item</span>
        </Link>
        <div
          id="tooltip-home"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Timer
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link
          className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          href="/authed/ticket/list"
        >
          <TicketIcon />
          <span className="sr-only">New item</span>
        </Link>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Wallet
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <Link
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            href="/authed/ticket/create"
          >
            <PlusIcon />
            <span className="sr-only">New item</span>
          </Link>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link
          className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          href="/authed/groups"
        >
          <GroupIcon />
          <span className="sr-only">New item</span>
        </Link>
        <div
          id="tooltip-settings"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Groups
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link
          className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          href="/authed/profile"
        >
          <ProfileIcon />
          <span className="sr-only">New item</span>
        </Link>
        <div
          id="tooltip-profile"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
}
