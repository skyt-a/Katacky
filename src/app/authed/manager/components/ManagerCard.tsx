"use client";
import { Ticket as TicketType, TicketManager } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/common";
import { Sheet, SheetTrigger, SheetContent } from "~/components/common/sheet";
import { useToast } from "~/components/common/use-toast";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { trpc } from "~/lib/trpc/connectNext";
import { manageTypeToText } from "~/util/setting";
import { UnionNullToUndefined } from "~/util/types";

type ManagerCardProps = {
  manager: TicketManager;
  ticket: UnionNullToUndefined<TicketType> | null;
};

export const ManagerCard = ({ manager, ticket }: ManagerCardProps) => {
  const deleteSchedule = trpc.ticketManager.delete.useMutation();
  const { toast } = useToast();
  const router = useRouter();
  const onClickDeleteSchedule = async () => {
    await deleteSchedule.mutateAsync({ id: manager.id });
    toast({
      toastType: "info",
      description: "チケットスケジュールを削除しました",
    });
    router.refresh();
  };
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>{manager.name}</CardTitle>
            <CardDescription>{manageTypeToText[manager.type]}</CardDescription>
          </CardHeader>
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
