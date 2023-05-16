"use client";
import Link from "next/link";
import { Suspense } from "react";
import { TicketListTopMenu } from "~/app/(authed)/ticket/(list)/components/TicketListTopMenu";
import { CardSkelton } from "~/components/layout/CardSkelton";

export default async function Ticket({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TicketListTopMenu />
      <div className="mt-2">
        <Suspense fallback={<CardSkelton />}>{children}</Suspense>
      </div>
    </>
  );
}
