"use client";
import { Button, Input as TextInput } from "~/components/common";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { useInput } from "~/util/form";
import { User } from "@prisma/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/lib/firebase/browser";
import { useRouter } from "next/navigation";
import { FileUploadButton } from "~/components/common/fileUpload";
import { useState, useTransition } from "react";
import { uploadFileToStorage } from "~/lib/firebase/storage";
import { AvatarImage } from "~/components/domain/profile/AvatarImage";
import { updateName, updateProfileImage } from "~/servers/user/mutation";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { ProfileSetting } from "~/app/(authed)/profile/components/ProfileSetting";

type ChangeSettingFormProps = {
  user: User;
  imageUrl: string | undefined;
};

export const ChangeSettingForm = ({
  user,
  imageUrl: imageUrlNow,
}: ChangeSettingFormProps) => {
  const nameInput = useInput(user.name);
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string | undefined>(imageUrlNow);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const onClickImageChangeButton = async () => {
    if (!imageUrl) {
      return;
    }
    const profileImageUrl = await uploadFileToStorage(user.authId, imageUrl);
    startTransition(() => {
      serverActionHandler(updateProfileImage(profileImageUrl), () =>
        toast({
          toastType: "info",
          description: "プロフィール画像を変更しました",
        })
      );
      router.refresh();
    });
  };
  const onClickNameChangeButton = async () => {
    startTransition(() => {
      serverActionHandler(updateName(nameInput.value), () => {
        toast({
          toastType: "info",
          description: "ユーザーネームを変更しました",
        });
      });
      router.refresh();
    });
  };
  const onClickPasswordChangeButton = async (e: any) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, user.email);
    toast({
      toastType: "info",
      description: "パスワード変更メールを送りました",
    });
  };
  return (
    <form className="flex flex-col gap-4">
      <AvatarImage imageUrl={imageUrl} />
      <FileUploadButton setValue={setImageUrl}>
        新しいプロフィール画像をアップロード
      </FileUploadButton>
      {imageUrlNow !== imageUrl && (
        <Button
          type="button"
          className="w-full"
          onClick={onClickImageChangeButton}
        >
          プロフィール画像の変更を反映する
        </Button>
      )}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">ユーザーネーム</Label>
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="ユーザーネームを入力してください"
          required={true}
          {...nameInput}
        />
      </div>
      <Button
        type="button"
        onClick={onClickNameChangeButton}
        className="w-full"
      >
        変更
      </Button>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">パスワード</Label>
        </div>
        <Button
          type="submit"
          onClick={onClickPasswordChangeButton}
          className="w-full"
        >
          変更メールを送信する
        </Button>
      </div>
      <ProfileSetting />
    </form>
  );
};
