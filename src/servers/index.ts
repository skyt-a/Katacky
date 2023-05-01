import { router } from "~/lib/trpc";
import { groupRouter } from "~/servers/group";
import { ticketRouter } from "~/servers/ticket";
import { userRouter } from "~/servers/user";

export const appRouter = router({
  user: userRouter,
  ticket: ticketRouter,
  group: groupRouter,
});

export type AppRouter = typeof appRouter;
