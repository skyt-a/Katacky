import { TicketHistory } from "~/app/authed/ticket/list/components/TicketHistory";
import { TicketList } from "~/app/authed/ticket/list/components/TicketList";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "~/components/common/tabs";

export const TicketListWrapper = () => {
  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="list">所持チケット</TabsTrigger>
        <TabsTrigger value="history">使用履歴</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        {/** @ts-expect-error Async Component  */}
        <TicketList />
      </TabsContent>
      <TabsContent value="history">
        {/** @ts-expect-error Async Component  */}
        <TicketHistory />
      </TabsContent>
    </Tabs>
  );
};
