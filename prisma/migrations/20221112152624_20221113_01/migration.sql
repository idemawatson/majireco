-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "ownerId" TEXT NOT NULL DEFAULT 'boc.10194@gmail.com';

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
