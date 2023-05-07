import { User as UserInfo } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    userInfoId: number | undefined;
    emailVerified?: boolean;
  }
  interface Session {
    user: {
      // Firebaseの認証情報
      uid: string;
      emailVerified?: boolean;
      userInfoId: number | undefined;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Firebaseの認証情報
    uid: string;
    emailVerified: boolean;
    userInfoId: number | undefined;
  }
}
