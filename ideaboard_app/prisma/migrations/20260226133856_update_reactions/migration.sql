/*
  Warnings:

  - The primary key for the `reactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `reactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'concept';

-- AlterTable
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "reactions_pkey" PRIMARY KEY ("authorId", "commentId");
