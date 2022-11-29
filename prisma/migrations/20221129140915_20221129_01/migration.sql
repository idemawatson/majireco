/*
  Warnings:

  - Added the required column `roundId` to the `RoundRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoundRecord" ADD COLUMN     "roundId" TEXT NOT NULL;
