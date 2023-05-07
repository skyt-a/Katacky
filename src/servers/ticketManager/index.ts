import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { publicProcedure, router } from "~/lib/trpc";
import { TicketManageType } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const ticketManagerRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.userInfoId === undefined) {
      return [];
    }
    const ticketManagers = await prisma.ticketManager.findMany({
      where: {
        retrieveUserId: ctx.session.user.userInfoId,
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
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.userInfoId === undefined) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const group = await prisma.ticketManager.create({
        data: {
          ...input,
          creatorId: ctx.session.user.userInfoId,
        },
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
