import { useCallback } from "react";
import supabase from "~/lib/supabase";
import { useSupabase } from "~/providers/SessionProvider";

export const useSignup = () => {
  const supabase = useSupabase();
  const signup = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    },
    [supabase]
  );

  return signup;
};
