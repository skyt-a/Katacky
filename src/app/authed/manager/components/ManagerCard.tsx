import { Ticket as TicketType, TicketManager } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/common";
import { Sheet, SheetTrigger, SheetContent } from "~/components/common/sheet";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { manageTypeToText } from "~/util/setting";
import { UnionNullToUndefined } from "~/util/types";

type ManagerCardProps = {
  manager: TicketManager;
  ticket: UnionNullToUndefined<TicketType> | null;
};

export const ManagerCard = ({ manager, ticket }: ManagerCardProps) => {
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
      </SheetContent>
    </Sheet>
  );
};
