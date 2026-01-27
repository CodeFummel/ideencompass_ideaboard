/*
  Warnings:

  - Added the required column `authorName` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "authorName" TEXT NOT NULL;
