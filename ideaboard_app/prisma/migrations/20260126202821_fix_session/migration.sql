/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sessions_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");
