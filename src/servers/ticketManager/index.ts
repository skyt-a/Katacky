import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { publicProcedure, router } from "~/lib/trpc";
import { TicketManageType } from "@prisma/client";

export const ticketManagerRouter = router({
  list: publicProcedure
    .input(z.object({ authId: z.number() }))
    .query(async ({ input: { authId } }) => {
      const ticketManagers = await prisma.ticketManager.findMany({
        where: {
          retrieveUserId: authId,
        },
      });
      return ticketManagers;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        count: z.number(),
        type: z.enum([
          TicketManageType.ONCE_DAY,
          TicketManageType.ONCE_WEEK,
          TicketManageType.ONCE_MONTH,
          TicketManageType.ONCE_YEAR,
        ]),
        retrieveUserId: z.number(),
        ticketId: z.number(),
        creatorId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const group = await prisma.ticketManager.create({
        data: input,
      });
      return group;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input: { id } }) => {
      const manager = await prisma.ticketManager.delete({
        where: {
          id,
        },
      });
      return manager;
    }),
});
