import { prisma } from "~/lib/prisma";
import supabase from "~/lib/supabase";

export const getUserInfo = async () => {
  const authId = (await supabase.auth.getSession())?.data?.session?.user.id;
  const user = await prisma.user.findFirst({
    where: { authId },
  });
  return user;
};
