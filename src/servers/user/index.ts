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
        groupId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      });
      return user;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        groupId: z.number().optional(),
      })
    )
    .mutation(async ({ input: { id, ...rest } }) => {
      const user = await prisma.user.update({
        data: rest,
        where: {
          id,
        },
      });
      return user;
    }),
  byGroup: publicProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ input: { groupId } }) => {
      const user = await prisma.user.findMany({
        where: {
          groupId,
        },
      });
      return user;
    }),
});
