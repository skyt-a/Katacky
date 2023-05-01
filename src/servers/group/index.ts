import { randomUUID } from "crypto";
import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { publicProcedure, router } from "~/lib/trpc";
import { v4 } from "uuid";

export const groupRouter = router({
  group: publicProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ input: { groupId } }) => {
      const group = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });
      return group;
    }),
  groupByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input: { token } }) => {
      const group = await prisma.group.findUnique({
        where: {
          token,
        },
      });
      return group;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const uuid = v4();
      const user = await prisma.group.create({
        data: {
          ...input,
          token: uuid,
        },
      });
      return user;
    }),
  delete: publicProcedure
    .input(z.object({ groupId: z.number() }))
    .mutation(async ({ input: { groupId } }) => {
      const group = await prisma.group.delete({
        where: {
          id: groupId,
        },
      });
      return group;
    }),
});
