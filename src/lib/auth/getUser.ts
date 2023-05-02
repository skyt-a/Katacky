import { cache } from "react";
import { prisma } from "~/lib/prisma";
import { createClientServer } from "~/lib/supabase/server";
import { getBaseUrl } from "~/util/api";

export const getUser = async () => {
  const supabase = createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  return user;
};

export const getUserInfo = async () => {
  const user = await getUser();
  const authId = user?.id;
  if (!authId) {
    return null;
  }
  const userInfo = await prisma.user.findFirst({
    where: { authId },
  });
  return userInfo;
};
