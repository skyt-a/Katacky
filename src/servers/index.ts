import { router } from "~/lib/trpc";
import { ticketRouter } from "~/servers/ticket";
import { userRouter } from "~/servers/user";

export const appRouter = router({
  user: userRouter,
  ticket: ticketRouter,
});

export type AppRouter = typeof appRouter;
