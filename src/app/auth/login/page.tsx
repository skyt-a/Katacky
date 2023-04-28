"use client";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { LoginForm } from "~/app/auth/login/components/LoginForm";

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/authed/profile");
    return null;
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
