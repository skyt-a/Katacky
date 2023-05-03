import { Suspense } from "react";
import { TicketHistory } from "~/app/authed/ticket/list/components/TicketHistory";
import { TicketList } from "~/app/authed/ticket/list/components/TicketList";
import { Skeleton } from "~/components/common/skeleton";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "~/components/common/tabs";
import { CardSkelton } from "~/components/layout/CardSkelton";

export const TicketListWrapper = () => {
  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="list">所持チケット</TabsTrigger>
        <TabsTrigger value="history">使用履歴</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <Suspense fallback={<CardSkelton />}>
          {/** @ts-expect-error Async Component  */}
          <TicketList />
        </Suspense>
      </TabsContent>
      <TabsContent value="history">
        <Suspense fallback={<CardSkelton />}>
          {/** @ts-expect-error Async Component  */}
          <TicketHistory />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};
