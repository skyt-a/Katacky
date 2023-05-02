-- CreateEnum
CREATE TYPE "TicketManageType" AS ENUM ('ONCE_YEAR', 'ONCE_MONTH_START', 'ONCE_MONTH_END', 'ONCE_DAY');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "isScheduled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TicketManager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "type" "TicketManageType" NOT NULL,
    "retrieveUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "TicketManager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketManager" ADD CONSTRAINT "TicketManager_retrieveUserId_fkey" FOREIGN KEY ("retrieveUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketManager" ADD CONSTRAINT "TicketManager_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
