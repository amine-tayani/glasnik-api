-- CreateEnum
CREATE TYPE "CommunityType" AS ENUM ('PRIVATE', 'PUBLIC', 'DUO');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "type" "CommunityType" DEFAULT E'PUBLIC';
