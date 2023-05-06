import { useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "~/lib/firebase/browser";
import {
  handleFirebaseAuthError,
  getMessageFromErrorCodeOnSendResetPass,
} from "~/lib/auth/authError";

export const useSendPassResetMail = () => {
  const signup = useCallback(async (email: string) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (e) {
      return handleFirebaseAuthError(e, getMessageFromErrorCodeOnSendResetPass);
    }
  }, []);

  return signup;
};
