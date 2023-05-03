/*
  Warnings:

  - The values [ONCE_MONTH_START,ONCE_MONTH_END] on the enum `TicketManageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketManageType_new" AS ENUM ('ONCE_YEAR', 'ONCE_MONTH', 'ONCE_WEEK', 'ONCE_DAY');
ALTER TABLE "TicketManager" ALTER COLUMN "type" TYPE "TicketManageType_new" USING ("type"::text::"TicketManageType_new");
ALTER TYPE "TicketManageType" RENAME TO "TicketManageType_old";
ALTER TYPE "TicketManageType_new" RENAME TO "TicketManageType";
DROP TYPE "TicketManageType_old";
COMMIT;
