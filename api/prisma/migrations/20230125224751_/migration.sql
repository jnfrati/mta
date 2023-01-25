-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUDO', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
