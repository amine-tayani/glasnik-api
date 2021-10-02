/*
  Warnings:

  - The primary key for the `Friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friendId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Friend` table. All the data in the column will be lost.
  - Added the required column `friendById` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendByMeId` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_pkey",
DROP COLUMN "friendId",
DROP COLUMN "userId",
ADD COLUMN     "friendById" TEXT NOT NULL,
ADD COLUMN     "friendByMeId" TEXT NOT NULL,
ADD PRIMARY KEY ("friendById", "friendByMeId");

-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("friendById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("friendByMeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
