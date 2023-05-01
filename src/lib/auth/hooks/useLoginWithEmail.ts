import { useCallback } from "react";
import { useSupabase } from "~/providers/SessionProvider";

export const useLoginWithEmail = () => {
  const supabase = useSupabase();
  const login = useCallback(
    async (email: string, password: string) => {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return res;
    },
    [supabase]
  );

  return login;
};
