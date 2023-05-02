import { useCallback } from "react";
import { createClientBrowser } from "~/lib/supabase/browser";

export const useSignup = () => {
  const supabase = createClientBrowser();
  const signup = useCallback(
    async (email: string, password: string) => {
      // const res = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // return res;
      await supabase.auth.signUp({ email, password });
    },
    [supabase]
  );

  return signup;
};
