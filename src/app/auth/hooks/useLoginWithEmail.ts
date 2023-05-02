import { useCallback } from "react";
import { createClientBrowser } from "~/lib/supabase/browser";

export const useLoginWithEmail = () => {
  const supabase = createClientBrowser();
  const login = useCallback(
    async (email: string, password: string) => {
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const res = await supabase.auth.signInWithPassword({ email, password });
      return res;
    },
    [supabase]
  );
  return login;
};
