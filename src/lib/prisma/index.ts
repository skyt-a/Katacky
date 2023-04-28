import { env } from "../../../env";
import { PrismaClient } from "@prisma/client";

/**
 * devでHot reloadのたびにPrismaClientを再生成しないようにする
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution
 */
const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}
