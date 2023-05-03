import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { auth } from "~/lib/firebase/browser";
import { signIn as signInByNextAuth } from "next-auth/react";

type ErrorCode = "auth/user-not-found";

export const useLoginWithEmail = () => {
  const login = useCallback(async (email: string, password: string) => {
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const result = await signInByNextAuth("credentials", {
        idToken,
        callbackUrl: "/authed/profile",
      });
      console.log(result);
      return result;
    } catch (e: any) {
      return e.code as ErrorCode;
    }
  }, []);
  return login;
};
