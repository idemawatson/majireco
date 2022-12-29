/*
  Warnings:

  - You are about to drop the `GameResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_playerOnGamePlayerId_playerOnGameGameId_fkey";

-- DropTable
DROP TABLE "GameResult";
