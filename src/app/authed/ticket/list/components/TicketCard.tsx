import type { Ticket as TicketType } from "@prisma/client";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/common";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/common/sheet";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { UnionNullToUndefined } from "~/util/types";

type TicketCardProps = {
  ticket: UnionNullToUndefined<TicketType>;
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="p-2">
          <CardHeader>
            <CardTitle>{ticket.title}</CardTitle>
            <CardDescription>送り主: {ticket.from}</CardDescription>
          </CardHeader>
          <CardContent>{ticket.message}</CardContent>
          <CardFooter>
            <>
              有効期限:
              {ticket.expiredDate
                ? format(ticket.expiredDate, "yyyy年MM月dd日")
                : "なし"}
            </>
          </CardFooter>
        </Card>
      </SheetTrigger>
      <SheetContent position="bottom" size="content">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div>
          <Ticket {...ticket} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
