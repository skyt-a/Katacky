import { auth } from "~/lib/firebase/server";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);
            const userInfo = await prisma.user.findUnique({
              where: { authId: decoded.uid },
            });
            return { ...decoded, userInfoId: userInfo?.id, id: decoded.uid };
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.userInfoId = user.userInfoId;
        token.emailVerified = user.emailVerified as boolean;
      }
      return token;
    },
    // sessionにJWTトークンからのユーザ情報を格納
    async session({ session, token }) {
      if (!session || !session.user) {
        return session;
      }
      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      session.user.userInfoId = token.userInfoId;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
