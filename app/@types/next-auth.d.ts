import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      // Firebaseの認証情報
      uid: string;
      emailVerified?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Firebaseの認証情報
    uid: string;
    emailVerified: boolean;
  }
}
