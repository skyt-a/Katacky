import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { auth } from "~/lib/firebase/browser";
import { signOut as signOutNextAuth } from "next-auth/react";

export const useLogout = () => {
  const logout = useCallback(async () => {
    // fetch("/api/auth/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    await signOutNextAuth();
    await signOut(auth);
  }, []);

  return logout;
};
