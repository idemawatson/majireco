/*
  Warnings:

  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 't1';
