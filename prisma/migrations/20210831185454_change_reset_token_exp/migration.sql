-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetTokenExpiry" DROP NOT NULL,
ALTER COLUMN "resetTokenExpiry" DROP DEFAULT;
