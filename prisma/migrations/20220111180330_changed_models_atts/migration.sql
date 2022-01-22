/*
  Warnings:

  - You are about to drop the column `name` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `thumbUrl` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topic]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Channel.name_unique";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "name",
ADD COLUMN     "member_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "message_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT;

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "thumbUrl",
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "member_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "owner" BOOLEAN,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "photoUrl",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "verified" BOOLEAN DEFAULT false,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel.topic_unique" ON "Channel"("topic");
