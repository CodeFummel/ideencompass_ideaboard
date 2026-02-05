/*
  Warnings:

  - Added the required column `closeDate` to the `polls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "polls" ADD COLUMN     "closeDate" TIMESTAMP(3) NOT NULL;
