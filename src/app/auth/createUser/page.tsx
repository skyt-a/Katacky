"use client";
import { redirect, useRouter } from "next/navigation";
import { CreateUserForm } from "~/app/auth/createUser/components/CreateUserForm";
import { useUser, useUserInfo } from "~/lib/auth/hooks/useUser";

export default function CreateUserPage() {
  const router = useRouter();
  const user = useUser();
  const userInfo = useUserInfo(user.data?.id);
  if (userInfo) {
    redirect("/authed/profile");
  }

  return (
    <>
      <CreateUserForm />
    </>
  );
}
