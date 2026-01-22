-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'LEAD', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
