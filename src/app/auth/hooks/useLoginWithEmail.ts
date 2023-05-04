import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { auth } from "~/lib/firebase/browser";
import { SignInResponse, signIn as signInByNextAuth } from "next-auth/react";
import { FirebaseError } from "firebase/app";
import { TAuthError } from "~/lib/auth/authError";

export const useLoginWithEmail: () => (
  email: string,
  password: string
) => Promise<SignInResponse | TAuthError | undefined> = () => {
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
    } catch (e) {
      if (e instanceof FirebaseError) {
        return { error: true, code: e.code };
      }
      throw e;
    }
  }, []);
  return login;
};
