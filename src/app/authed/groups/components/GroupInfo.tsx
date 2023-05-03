"use client";
import { Group, User } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { Button } from "~/components/common";
import { useUsersInTargetGroup } from "~/hooks/domain/useUsersInTargetGroup";
import { trpc } from "~/lib/trpc/connectNext";

type GroupInfoProps = {
  group: Group;
  user: User | null;
};

export const GroupInfo = ({ group, user }: GroupInfoProps) => {
  const { Canvas } = useQRCode();
  const deleteGroup = trpc.group.delete.useMutation();
  const { data: users } = useUsersInTargetGroup(user?.groupId);
  const router = useRouter();
  const onClickDelete = async () => {
    await deleteGroup.mutateAsync({ groupId: group.id });
    router.refresh();
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
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Button
        onClick={onClickDelete}
        className="mt-4 w-full"
        variant="destructive"
      >
        このグループを削除する
      </Button>
      <p className="mt-4">
        以下のQRコードを読み取ると他の人がグループに参加できます
      </p>
      <div className="flex justify-center mt-4">
        <Canvas
          text={`${group?.token}`}
          options={{
            level: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#010599FF",
              light: "#FFBF60FF",
            },
          }}
        />
      </div>
    </>
  );
};
