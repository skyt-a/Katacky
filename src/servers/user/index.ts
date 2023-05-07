import { TRPCError } from "@trpc/server";
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
      return user;
    }),
  loggedInUser: publicProcedure.query(async ({ ctx }) => {
    const uid = ctx.session.user.uid;
    const user = await prisma.user.findFirst({
      where: {
        authId: uid,
      },
    });
    return user;
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        authId: z.string(),
        email: z.string().email(),
        groupId: z.number().optional(),
        profileImageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      });
      return user;
    }),
  joinGroup: publicProcedure
    .input(
      z.object({
        id: z.number(),
        groupId: z.number(),
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
  leaveGroup: publicProcedure.mutation(
    async ({
      ctx: {
        session: {
          user: { userInfoId },
        },
      },
    }) => {
      console.log("user", userInfoId);
      if (!userInfoId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const user = await prisma.user.update({
        data: {
          groupId: null,
        },
        where: {
          id: userInfoId,
        },
      });
      return user;
    }
  ),
  updateDeviceToken: publicProcedure
    .input(z.object({ deviceToken: z.string() }))
    .mutation(
      async ({
        input: { deviceToken },
        ctx: {
          session: {
            user: { userInfoId },
          },
        },
      }) => {
        if (!userInfoId) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        const updatedUser = await prisma.user.update({
          data: {
            deviceToken,
          },
          where: {
            id: userInfoId,
          },
        });
        return updatedUser;
      }
    ),
  updateName: publicProcedure.input(z.object({ name: z.string() })).mutation(
    async ({
      input: { name },
      ctx: {
        session: {
          user: { userInfoId },
        },
      },
    }) => {
      if (!userInfoId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const updatedUser = await prisma.user.update({
        data: {
          name,
        },
        where: {
          id: userInfoId,
        },
      });
      return updatedUser;
    }
  ),
  updateProfileImage: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(
      async ({
        input: { url },
        ctx: {
          session: {
            user: { userInfoId },
          },
        },
      }) => {
        const updatedUser = await prisma.user.update({
          data: {
            profileImageUrl: url,
          },
          where: {
            id: userInfoId,
          },
        });
        return updatedUser;
      }
    ),
});
