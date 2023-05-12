import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "~/lib/trpc/context";
import { appRouter } from "~/servers";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
