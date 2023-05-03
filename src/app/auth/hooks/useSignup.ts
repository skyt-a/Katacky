import { useCallback } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/firebase/browser";

export const useSignup = () => {
  const signup = useCallback(async (email: string, password: string) => {
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // return res;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }, []);

  return signup;
};
