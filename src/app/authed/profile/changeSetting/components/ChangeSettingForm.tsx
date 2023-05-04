"use client";
import { Button, Input as TextInput } from "~/components/common";
import { Label } from "~/components/common/label";
import { useToast } from "~/components/common/use-toast";
import { useInput } from "~/util/form";
import { User } from "@prisma/client";
import { trpc } from "~/lib/trpc/connectNext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/lib/firebase/browser";
import { ProfileSetting } from "~/app/authed/profile/components/ProfileSetting";
import { useRouter } from "next/navigation";

type ChangeSettingFormProps = {
  user: User;
};

export const ChangeSettingForm = ({ user }: ChangeSettingFormProps) => {
  const nameInput = useInput(user.name);
  const { toast } = useToast();
  const utils = trpc.useContext();
  const updateName = trpc.user.updateName.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
    },
  });
  const router = useRouter();
  const onClickNameChangeButton = async (e: any) => {
    e.preventDefault();
    await updateName.mutateAsync({ name: nameInput.value });
    toast({
      toastType: "info",
      description: "ユーザーネームを変更しました",
    });
    router.refresh();
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
        type="submit"
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
