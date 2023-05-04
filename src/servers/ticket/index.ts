import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import superJson from "superjson";
import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { publicProcedure, router } from "~/lib/trpc";
import * as firebaseAdmin from "firebase-admin";

const sendMessage = async (
  chat: string,
  tokens: string[]
): Promise<BatchResponse> => {
  const params = {
    notification: {
      title: "テストタイトル",
      body: chat,
    },
    tokens,
  };

  return await firebaseAdmin.messaging().sendEachForMulticast(params);
};

export const ticketRouter = router({
  createList: publicProcedure
    .input(z.object({ creatorId: z.number() }))
    .query(async ({ input: { creatorId } }) => {
      const user = await prisma.ticket.findMany({
        where: {
          creatorId,
        },
      });
      console.log("user", user);
      return user;
    }),
  holdList: publicProcedure
    .input(z.object({ holderId: z.number() }))
    .query(async ({ input: { holderId } }) => {
      const user = await prisma.ticket.findMany({
        where: {
          holderId,
        },
      });
      console.log("user", user);
      return user;
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        message: z.string(),
        backgroundColor: z.string(),
        creatorId: z.number(),
        expiredDate: z.date().optional(),
        from: z.string(),
        to: z.string(),
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
      const ticket = await prisma.ticket.update({
        where: {
          id,
        },
        data: {
          holderId: userId,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user?.deviceToken) {
        const response = await sendMessage("チケットが届きました", [
          user.deviceToken,
        ]);
        console.log(response.responses[0].error);
      }
      return ticket;
    }),
});
