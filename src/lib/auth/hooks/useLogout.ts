import { useCallback } from "react";
import supabase from "~/lib/supabase";

export const useLogout = () => {
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return logout;
};
