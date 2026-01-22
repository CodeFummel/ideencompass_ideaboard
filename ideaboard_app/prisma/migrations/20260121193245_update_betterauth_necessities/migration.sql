/*
  Warnings:

  - Added the required column `userAgent` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "userAgent" TEXT NOT NULL;
