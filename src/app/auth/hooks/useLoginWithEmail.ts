import { getMessageFromErrorCodeOnLogin } from "./../../../lib/auth/authError";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { auth } from "~/lib/firebase/browser";
import { SignInResponse, signIn as signInByNextAuth } from "next-auth/react";
import { TAuthError, handleFirebaseAuthError } from "~/lib/auth/authError";

export const useLoginWithEmail: () => (
  email: string,
  password: string
) => Promise<SignInResponse | TAuthError | undefined> = () => {
  const login = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const result = await signInByNextAuth("credentials", {
        idToken,
        callbackUrl: "/profile",
      });
      return result;
    } catch (e) {
      return handleFirebaseAuthError(e, getMessageFromErrorCodeOnLogin);
    }
  }, []);
  return login;
};
