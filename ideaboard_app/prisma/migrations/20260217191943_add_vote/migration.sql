/*
  Warnings:

  - You are about to drop the column `votes` on the `options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "options" DROP COLUMN "votes";

-- CreateTable
CREATE TABLE "votes" (
    "authorId" TEXT NOT NULL,
    "votedPoll" INTEGER NOT NULL,
    "votedOption" INTEGER NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("authorId","votedPoll")
);

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_votedPoll_fkey" FOREIGN KEY ("votedPoll") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_votedOption_fkey" FOREIGN KEY ("votedOption") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
