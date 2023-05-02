import { useCallback } from "react";
import { createClientBrowser } from "~/lib/supabase/browser";

export const useLogout = () => {
  const supabase = createClientBrowser();
  const logout = useCallback(async () => {
    // fetch("/api/auth/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const { error } = await supabase.auth.signOut();
    console.error(error);
  }, [supabase]);

  return logout;
};
