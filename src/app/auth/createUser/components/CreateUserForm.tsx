"use client";
import { Group } from "@prisma/client";
import { group } from "console";
import { User } from "firebase/auth";
import { useState, useTransition } from "react";
import { useLogout } from "~/app/auth/hooks/useLogout";
import { Button, Input as TextInput } from "~/components/common";
import { FileUploadButton } from "~/components/common/fileUpload";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { AvatarImage } from "~/components/domain/profile/AvatarImage";
import { uploadFileToStorage } from "~/lib/firebase/storage";
import { QRCodeScanner } from "~/lib/qr/QRCodeScanner";
import { groupByToken } from "~/servers/group/query";
import { createUser } from "~/servers/user/mutation";
import { useInput } from "~/util/form";

type CreateUserFormProps = {
  user: User | null;
};

export const CreateUserForm = ({ user }: CreateUserFormProps) => {
  const userNameInput = useInput("");
  const [isGroupRegister, setIsGroupRegister] = useState<boolean>();
  const [groupFromToken, setGroupFromToken] = useState<Group>();
  const detectToken = async (groupToken: string) => {
    const group = await groupByToken(groupToken);
    if (group) {
      setGroupFromToken(group);
    }
  };
  const [imageUrl, setImageUrl] = useState<string>();
  const { toast } = useToast();
  const logout = useLogout();
  const onClickButton = async (e: any) => {
    e.preventDefault();
    if (!user?.email || !user?.uid) {
      return;
    }
    const profileImageUrl = await uploadFileToStorage(user.uid, imageUrl!);
    await createUser({
      name: userNameInput.value,
      authId: user.uid,
      email: user.email,
      groupId: groupFromToken?.id,
      profileImageUrl,
    });
    toast({
      toastType: "info",
      description: "ユーザー登録が完了しました",
    });
    logout();
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
      {groupFromToken && <p>グループ名: {groupFromToken.name}</p>}
      {isGroupRegister && !groupFromToken && (
        <QRCodeScanner setData={detectToken} />
      )}
      <FileUploadButton setValue={setImageUrl}>
        プロフィール画像アップロード
      </FileUploadButton>
      <AvatarImage imageUrl={imageUrl} />
      <Button type="button" onClick={onClickButton}>
        登録
      </Button>
    </form>
  );
};
