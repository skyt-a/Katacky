import { TRPCError, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { createContext } from "~/lib/trpc/context";

const t = initTRPC.context<typeof createContext>().create({
  transformer: SuperJSON,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (ctx.session?.user.userInfoId === undefined) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(isAuthed);
export const middleware = t.middleware;
