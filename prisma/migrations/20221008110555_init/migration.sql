-- CreateEnum
CREATE TYPE "GameRule" AS ENUM ('RULE_1020', 'RULE_1030');

-- CreateEnum
CREATE TYPE "GameRate" AS ENUM ('NO_RATE', 'PER_10', 'PER_30', 'PER_50');

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL,
    "rule" "GameRule" NOT NULL,
    "rate" "GameRate" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamesOnPlayers" (
    "playerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "GamesOnPlayers_pkey" PRIMARY KEY ("playerId","gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- AddForeignKey
ALTER TABLE "GamesOnPlayers" ADD CONSTRAINT "GamesOnPlayers_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnPlayers" ADD CONSTRAINT "GamesOnPlayers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
