-- DropForeignKey
ALTER TABLE "PlayerOnGame" DROP CONSTRAINT "PlayerOnGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "RoundRecord" DROP CONSTRAINT "RoundRecord_playerOnGamePlayerId_playerOnGameGameId_fkey";

-- AddForeignKey
ALTER TABLE "PlayerOnGame" ADD CONSTRAINT "PlayerOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundRecord" ADD CONSTRAINT "RoundRecord_playerOnGamePlayerId_playerOnGameGameId_fkey" FOREIGN KEY ("playerOnGamePlayerId", "playerOnGameGameId") REFERENCES "PlayerOnGame"("playerId", "gameId") ON DELETE CASCADE ON UPDATE CASCADE;
