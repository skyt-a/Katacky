import { getServerSession } from "next-auth/next";
import * as trpc from "@trpc/server";
import { authOptions } from "~/lib/auth/authOption";

export const createContext = async () => {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
