"use client";
import { Group, Ticket, User } from "@prisma/client";
import { format } from "date-fns";
import { useQRCode } from "next-qrcode";
import { GroupInviteButton } from "~/app/(authed)/groups/_components/info/GroupInviteButton";
import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { deleteGroup } from "~/servers/group/mutation";
import { leaveGroup } from "~/servers/user/mutation";

type GroupInfoProps = {
  group: Group;
  user: User | null;
  imageUrl?: string;
  groupUsers: User[] | undefined;
  ticketGroupHistory: (Ticket & {
    holder: User | null;
  })[];
};

export const GroupInfo = ({
  group,
  user,
  groupUsers,
  ticketGroupHistory,
}: GroupInfoProps) => {
  const { toast } = useToast();

  const onDeleteGroup = async () => {
    await deleteGroup(group.id);
    toast({
      toastType: "info",
      description: "グループを削除しました",
    });
  };
  const onLeaveGroup = async () => {
    await leaveGroup();
    toast({
      toastType: "info",
      description: "グループから退会しました",
    });
  };

  return (
    <article>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b-stone-950 border-b-2">
        {group?.name}
      </h3>
      <section className="mt-2">
        <h4 className="mt-4 text-xl font-semibold tracking-tight">
          グループメンバー
        </h4>
        <ul className="mt-2">
          {groupUsers?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <div className="mt-2">
          <GroupInviteButton token={group.token} />
        </div>
      </section>
      <section className="mt-4">
        <h4 className="mt-4 text-xl font-semibold tracking-tight">
          チケット使用履歴(最新10件)
        </h4>
        <ul className="mt-2">
          {ticketGroupHistory?.map((ticket) => (
            <li key={ticket.id} className="border-t-2 p-2">
              <div className="text-xs">
                {ticket.holder?.name ?? "未割り当て"}
              </div>
              <div className="flex justify-between">
                <div>{ticket.title}</div>
                <div>{format(ticket.usedDate!, "yyyy/MM/dd")}</div>
              </div>
              {ticket.useMessage && ticket.useMessage.length > 0 && (
                <div className="break-all">{ticket.useMessage}</div>
              )}
            </li>
          ))}
        </ul>
      </section>
      {group.creatorId === user?.id ? (
        <Button
          onClick={onDeleteGroup}
          className="mt-4 w-full"
          variant="destructive"
        >
          このグループを削除する
        </Button>
      ) : (
        <Button
          onClick={onLeaveGroup}
          className="mt-4 w-full"
          variant="destructive"
        >
          このグループから脱退する
        </Button>
      )}
    </article>
  );
};
