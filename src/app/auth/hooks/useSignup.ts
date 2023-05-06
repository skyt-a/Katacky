import { useCallback } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/firebase/browser";
import {
  getMessageFromErrorCodeOnSignup,
  handleFirebaseAuthError,
} from "~/lib/auth/authError";

export const useSignup = () => {
  const signup = useCallback(async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      return handleFirebaseAuthError(e, getMessageFromErrorCodeOnSignup);
    }
  }, []);

  return signup;
};
