"use client";
import { Ticket as TicketType, TicketManager } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/common";
import { Sheet, SheetTrigger, SheetContent } from "~/components/common/sheet";
import { useToast } from "~/components/common/use-toast";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { deleteTicketManager } from "~/servers/ticketManager/mutation";
import { manageTypeToText } from "~/util/setting";
import { UnionNullToUndefined } from "~/util/types";

type ManagerCardProps = {
  manager: TicketManager;
  ticket: UnionNullToUndefined<TicketType>;
};

export const ManagerCard = ({ manager, ticket }: ManagerCardProps) => {
  const { toast } = useToast();
  const [, startTransition] = useTransition();
  const onClickDeleteSchedule = () =>
    startTransition(() => {
      serverActionHandler(deleteTicketManager(manager.id, ticket.id), () => {
        toast({
          toastType: "info",
          description: "チケットスケジュールを削除しました",
        });
      });
    });

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>{manager.name}</CardTitle>
            <CardDescription>{manageTypeToText[manager.type]}</CardDescription>
          </CardHeader>
          <CardContent>宛先: {ticket?.to}</CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent position="bottom" size="content">
        <Ticket {...ticket} />
        <Button
          className="mt-2 w-full"
          variant="destructive"
          onClick={onClickDeleteSchedule}
        >
          削除する
        </Button>
      </SheetContent>
    </Sheet>
  );
};
