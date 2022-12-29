-- CreateTable
CREATE TABLE "GameResult" (
    "id" TEXT NOT NULL,
    "playerOnGamePlayerId" TEXT NOT NULL,
    "playerOnGameGameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "avgRank" DOUBLE PRECISION NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "roundNum" INTEGER NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_id_key" ON "GameResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_playerOnGamePlayerId_playerOnGameGameId_key" ON "GameResult"("playerOnGamePlayerId", "playerOnGameGameId");

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_playerOnGamePlayerId_playerOnGameGameId_fkey" FOREIGN KEY ("playerOnGamePlayerId", "playerOnGameGameId") REFERENCES "PlayerOnGame"("playerId", "gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
