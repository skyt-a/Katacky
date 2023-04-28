import { useCallback } from "react";
import { useSupabase } from "~/providers/SessionProvider";

export const useLoginWithEmail = () => {
  const supabase = useSupabase();
  const login = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    [supabase]
  );

  return login;
};
