"use client";
import { Group, User } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { deleteGroup } from "~/servers/group/mutation";
import { leaveGroup } from "~/servers/user/mutation";

type GroupInfoProps = {
  group: Group;
  user: User | null;
  imageUrl?: string;
  groupUsers: User[] | undefined;
};

export const GroupInfo = ({ group, user, groupUsers }: GroupInfoProps) => {
  const { Canvas } = useQRCode();
  const [, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const onDeleteGroup = async () => {
    await deleteGroup(group.id);
    router.refresh();
    toast({
      toastType: "info",
      description: "グループを削除しました",
    });
  };
  const onLeaveGroup = async () => {
    await leaveGroup();
    router.refresh();
    toast({
      toastType: "info",
      description: "グループから退会しました",
    });
  };

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b-stone-950 border-b-2">
        {group?.name}
      </h3>
      <h4 className="mt-4 text-xl font-semibold tracking-tight">
        グループメンバー
      </h4>
      <ul className="mt-2">
        {groupUsers?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
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
      <p className="mt-4">
        以下のQRコードを読み取ると他の人がグループに参加できます
      </p>
      <div className="flex justify-center mt-4">
        <Canvas
          text={`${group?.token}`}
          // logo={{
          //   src: imageUrl ?? "",
          //   options: {
          //     width: 50,
          //     x: 75,
          //     y: 75,
          //   },
          // }}
          options={{
            level: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000",
              light: "#fff",
            },
          }}
        />
      </div>
    </>
  );
};
