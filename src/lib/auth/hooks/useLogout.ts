import { useCallback } from "react";
import { useSupabase } from "~/providers/SessionProvider";

export const useLogout = () => {
  const supabase = useSupabase();
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, [supabase]);

  return logout;
};
