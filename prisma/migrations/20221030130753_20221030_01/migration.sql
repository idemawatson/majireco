/*
  Warnings:

  - You are about to drop the `GamesOnPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GamesOnPlayers" DROP CONSTRAINT "GamesOnPlayers_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GamesOnPlayers" DROP CONSTRAINT "GamesOnPlayers_playerId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "playedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "GamesOnPlayers";

-- CreateTable
CREATE TABLE "PlayerOnGame" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "PlayerOnGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playerOnGameId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "RoundRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerOnGame_id_key" ON "PlayerOnGame"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoundRecord_id_key" ON "RoundRecord"("id");

-- AddForeignKey
ALTER TABLE "PlayerOnGame" ADD CONSTRAINT "PlayerOnGame_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerOnGame" ADD CONSTRAINT "PlayerOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundRecord" ADD CONSTRAINT "RoundRecord_playerOnGameId_fkey" FOREIGN KEY ("playerOnGameId") REFERENCES "PlayerOnGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
