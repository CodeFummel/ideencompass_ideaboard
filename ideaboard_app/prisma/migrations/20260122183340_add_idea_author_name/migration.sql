/*
  Warnings:

  - Added the required column `authorName` to the `idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "authorName" TEXT NOT NULL;
