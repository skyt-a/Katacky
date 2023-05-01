"use client";
import { redirect } from "next/navigation";
import { CreateUserForm } from "~/app/auth/createUser/components/CreateUserForm";
import { useUserInfo } from "~/lib/auth/hooks/useUser";

export default function CreateUserPage() {
  const userInfo = useUserInfo();
  if (userInfo) {
    redirect("/authed/profile");
  }

  return (
    <>
      <CreateUserForm />
    </>
  );
}
