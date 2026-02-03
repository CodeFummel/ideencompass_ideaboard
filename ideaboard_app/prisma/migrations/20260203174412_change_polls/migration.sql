/*
  Warnings:

  - You are about to drop the column `allVotes` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `votes` on the `polls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "polls" DROP COLUMN "allVotes",
DROP COLUMN "options",
DROP COLUMN "votes";

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
