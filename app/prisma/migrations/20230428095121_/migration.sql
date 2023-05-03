/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_token_key" ON "Group"("token");
