import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { publicProcedure, router } from "~/lib/trpc";
import { getUserInfo } from "~/lib/auth/getUser";
import { sendFirebaseCloudMessage } from "~/lib/firebase/sendMessage";
import { ticketFormLength } from "~/util/setting";

export const ticketRouter = router({
  createList: publicProcedure
    .input(z.object({ creatorId: z.number() }))
    .query(async ({ input: { creatorId } }) => {
      const user = await prisma.ticket.findMany({
        where: {
          creatorId,
        },
      });
      return user;
    }),
  holdList: publicProcedure.query(async ({ ctx }) => {
    const holderId = ctx?.session?.user?.userInfoId;
    if (!holderId) {
      return [];
    }
    const users = await prisma.ticket.findMany({
      where: {
        holderId,
        isUsed: false,
        isScheduled: false,
        OR: [
          {
            expiredDate: null,
          },
          {
            expiredDate: {
              gte: new Date(),
            },
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return users;
  }),
  usedList: publicProcedure.query(async ({ ctx }) => {
    const holderId = ctx?.session?.user?.userInfoId;
    if (!holderId) {
      return [];
    }
    const users = await prisma.ticket.findMany({
      where: {
        holderId,
        isUsed: true,
        isScheduled: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return users;
  }),
  listByIds: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input: { ids } }) => {
      const users = await prisma.ticket.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return users;
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().max(ticketFormLength.title),
        message: z.string().max(ticketFormLength.message),
        backgroundColor: z.string(),
        creatorId: z.number(),
        expiredDate: z.date().optional(),
        from: z.string().max(ticketFormLength.from),
        to: z.string().max(ticketFormLength.to),
        availableDateFrom: z.date().optional(),
        isScheduled: z.boolean().optional(),
        holderId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.ticket.create({
        data: input,
      });
      return user;
    }),
  use: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input: { id } }) => {
      const user = await prisma.ticket.update({
        where: {
          id,
        },
        data: {
          isUsed: true,
          usedDate: new Date(),
        },
      });
      return user;
    }),
  send: publicProcedure
    .input(z.object({ id: z.number(), userId: z.number() }))
    .mutation(async ({ input: { id, userId } }) => {
      const user = await getUserInfo();
      const ticket = await prisma.ticket.update({
        where: {
          id,
        },
        data: {
          holderId: userId,
        },
      });
      const retrieveUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (retrieveUser?.deviceToken) {
        const response = await sendFirebaseCloudMessage(
          {
            title: "チケットが届きました",
            body: `${user?.name}からチケット「${ticket.title}」が届きました！`,
          },
          [retrieveUser.deviceToken]
        );
      }
      return ticket;
    }),
});
