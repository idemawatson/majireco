/*
  Warnings:

  - The primary key for the `PlayerOnGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlayerOnGame` table. All the data in the column will be lost.
  - You are about to drop the column `playerOnGameId` on the `RoundRecord` table. All the data in the column will be lost.
  - Added the required column `playerOnGameGameId` to the `RoundRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerOnGamePlayerId` to the `RoundRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoundRecord" DROP CONSTRAINT "RoundRecord_playerOnGameId_fkey";

-- DropIndex
DROP INDEX "PlayerOnGame_id_key";

-- AlterTable
ALTER TABLE "PlayerOnGame" DROP CONSTRAINT "PlayerOnGame_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PlayerOnGame_pkey" PRIMARY KEY ("playerId", "gameId");

-- AlterTable
ALTER TABLE "RoundRecord" DROP COLUMN "playerOnGameId",
ADD COLUMN     "playerOnGameGameId" TEXT NOT NULL,
ADD COLUMN     "playerOnGamePlayerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RoundRecord" ADD CONSTRAINT "RoundRecord_playerOnGamePlayerId_playerOnGameGameId_fkey" FOREIGN KEY ("playerOnGamePlayerId", "playerOnGameGameId") REFERENCES "PlayerOnGame"("playerId", "gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
