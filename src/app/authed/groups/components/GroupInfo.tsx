"use client";
import { Group } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import { Button } from "~/components/common";
import { trpc } from "~/lib/trpc/connectNext";

type GroupInfoProps = {
  group: Group;
};

export const GroupInfo = ({ group }: GroupInfoProps) => {
  const { Canvas } = useQRCode();
  const deleteGroup = trpc.group.delete.useMutation();
  const onClickDelete = async () => {
    await deleteGroup.mutateAsync({ groupId: group.id });
  };
  return (
    <>
      <div>{group?.name}</div>
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
      <Button onClick={onClickDelete}>このグループを削除する</Button>
    </>
  );
};
