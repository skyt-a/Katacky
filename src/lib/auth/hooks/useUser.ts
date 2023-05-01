import { useSupabase } from "~/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "~/lib/trpc/connectNext";

export const useUser = () => {
  const supabase = useSupabase();
  return useQuery(
    ["user"],
    async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
    { suspense: true }
  );
};

export const useUserInfo = () => {
  const authId = useUser()?.data?.id;
  const { data: userInfo } = trpc.user.user.useQuery(
    { authId },
    { suspense: true, enabled: !!authId }
  );
  return userInfo;
};
