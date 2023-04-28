import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { publicProcedure, router } from "~/lib/trpc";

export const userRouter = router({
  user: publicProcedure
    .input(z.object({ authId: z.string().optional() }))
    .query(async ({ input: { authId } }) => {
      if (!authId) return null;
      const user = await prisma.user.findFirst({
        where: {
          authId,
        },
      });
      console.log("user", user);
      return user;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        authId: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      });
      return user;
    }),
});
