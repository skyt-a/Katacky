"use client";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input as TextInput } from "~/components/common";
import { Label } from "~/components/common/label";
import { QRCodeScanner } from "~/lib/qr/QRCodeScanner";
import { trpc } from "~/lib/trpc/connectNext";
import { useInput } from "~/util/form";

type CreateUserFormProps = {
  user: User | null;
};

export const CreateUserForm = ({ user }: CreateUserFormProps) => {
  const userNameInput = useInput("");
  const createUser = trpc.user.create.useMutation();
  const [isGroupRegister, setIsGroupRegister] = useState<boolean>();
  const [groupToken, setGroupToken] = useState<string>();
  const { isFetching, data: group } = trpc.group.groupByToken.useQuery(
    {
      token: groupToken!,
    },
    { enabled: !!groupToken }
  );
  const router = useRouter();
  const onClickButton = async (e: any) => {
    e.preventDefault();
    if (!user?.email || !user?.uid) {
      return;
    }
    const userCreated = await createUser.mutateAsync({
      name: userNameInput.value,
      authId: user.uid,
      email: user.email,
      groupId: group?.id,
    });
    router.push("/authed/profile");
  };
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="userName">ユーザー名</Label>
        </div>
        <TextInput
          id="userName"
          type="text"
          placeholder="ユーザーネームを入力してください"
          required={true}
          {...userNameInput}
        />
      </div>
      <Button type="button" onClick={() => setIsGroupRegister(true)}>
        グループを登録する
      </Button>
      {isFetching && <p>グループを検索中...</p>}
      {group && <p>グループ名: {group.name}</p>}
      {isGroupRegister && !isFetching && !group && (
        <QRCodeScanner setData={setGroupToken} />
      )}
      <Button type="submit" onClick={onClickButton}>
        登録
      </Button>
    </form>
  );
};
