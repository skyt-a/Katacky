import superjson from "superjson";
import { createContext } from "~/lib/trpc/context";
import { createTRPCNextLayout } from "~/lib/trpc/server/createTRPCNextLayout";
import { appRouter } from "~/servers";

export const rsc = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext,
});
