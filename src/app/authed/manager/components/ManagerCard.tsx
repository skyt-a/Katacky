import { TicketManager } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/common";
import { Sheet, SheetTrigger, SheetContent } from "~/components/common/sheet";
import { manageTypeToText } from "~/util/setting";

type ManagerCardProps = {
  manager: TicketManager;
};

export const ManagerCard = ({ manager }: ManagerCardProps) => {
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
      <SheetContent position="bottom" size="content"></SheetContent>
    </Sheet>
  );
};
