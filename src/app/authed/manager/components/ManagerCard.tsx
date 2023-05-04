import { TicketManager } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/common";

type ManagerCardProps = {
  manager: TicketManager;
};

export const ManagerCard = ({ manager }: ManagerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{manager.name}</CardTitle>
        <CardDescription>{manager.type}</CardDescription>
      </CardHeader>
    </Card>
  );
};
