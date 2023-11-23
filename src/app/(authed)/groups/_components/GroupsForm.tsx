"use client";
import { Group, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button, Input as TextInput } from "~/components/common";
import { useToast } from "~/components/common/use-toast";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { QRCodeScanner } from "~/lib/qr/QRCodeScanner";
import { groupByToken } from "~/servers/group/query";

import { useInput } from "~/util/form";

type GroupFormProps = {
  createGroup(name: string): Promise<(User | Group)[]>;
  joinGroup(groupId: number): Promise<User>;
};

export const GroupsForm = ({ createGroup, joinGroup }: GroupFormProps) => {
  const groupNameInput = useInput("");
  const [, startTransition] = useTransition();

  const [isGroupRegister, setIsGroupRegister] = useState<boolean>(false);
  const { toast } = useToast();
  const [groupFromToken, setGroupFromToken] = useState<Group>();
  const detectToken = async (groupToken: string) => {
    const group = await groupByToken(groupToken);
    if (group) {
      setGroupFromToken(group);
    }
  };
  const onCreateGroup = () => {
    if (!groupFromToken) {
      startTransition(() => {
        serverActionHandler(createGroup(groupNameInput.value), () => {
          toast({
            toastType: "info",
            description: "グループを作成しました",
          });
        });
      });
    } else {
      startTransition(() => {
        serverActionHandler(joinGroup(groupFromToken.id), () => {
          toast({
            toastType: "info",
            description: `${groupFromToken.name}に参加しました}`,
          });
        });
      });
    }
  };

  return (
    <form className="flex flex-col gap-4">
      {!isGroupRegister ? (
        <FormControlWrapper label="グループ名" id="groupName">
          <TextInput
            id="groupName"
            type="text"
            placeholder="グループ名を入力してください"
            required={true}
            {...groupNameInput}
          />
        </FormControlWrapper>
      ) : (
        <>
          {groupFromToken && <p>グループ名: {groupFromToken.name}</p>}
          {!groupFromToken && <QRCodeScanner setData={detectToken} />}
        </>
      )}
      <Button type="button" onClick={onCreateGroup}>
        登録
      </Button>
      <Button type="button" onClick={() => setIsGroupRegister((now) => !now)}>
        {!isGroupRegister ? "他の人のグループに入る" : "グループを作成する"}
      </Button>
    </form>
  );
};
