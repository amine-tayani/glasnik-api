/*
  Warnings:

  - You are about to drop the `_UserFriendsUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFriendsUser" DROP CONSTRAINT "_UserFriendsUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFriendsUser" DROP CONSTRAINT "_UserFriendsUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photoUrl" TEXT;

-- DropTable
DROP TABLE "_UserFriendsUser";

-- CreateTable
CREATE TABLE "Friend" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    PRIMARY KEY ("userId","friendId")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
