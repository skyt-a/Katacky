import type { Ticket as TicketType } from "@prisma/client";
import { format } from "date-fns";
import { TicketPopupContent } from "~/app/authed/ticket/list/components/TicketPopupContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/common";
import { Badge } from "~/components/common/badge";
import { Sheet, SheetContent, SheetTrigger } from "~/components/common/sheet";
import { getUserInfo } from "~/lib/auth/getUser";
import { UnionNullToUndefined } from "~/util/types";

type TicketCardProps = {
  ticket: UnionNullToUndefined<TicketType>;
  isMine?: boolean;
};

export const TicketCard = async ({ ticket, isMine }: TicketCardProps) => {
  const user = await getUserInfo();
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="p-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>{ticket.title}</div>
              {isMine && <Badge variant="secondary">自作</Badge>}
            </CardTitle>
            <CardDescription className="text-right">
              送り主: {ticket.from}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-left">{ticket.message}</CardContent>
          <CardFooter className="text-right text-sm">
            {ticket.isUsed && ticket.usedDate ? (
              <>使用日時: {format(ticket.usedDate, "yyyy年MM月dd日")}</>
            ) : (
              <>
                有効期限:
                {ticket.expiredDate
                  ? format(ticket.expiredDate, "yyyy年MM月dd日")
                  : "なし"}{" "}
              </>
            )}
          </CardFooter>
        </Card>
      </SheetTrigger>
      <SheetContent position="bottom" size="content">
        {user && <TicketPopupContent ticket={ticket} user={user} />}
      </SheetContent>
    </Sheet>
  );
};
