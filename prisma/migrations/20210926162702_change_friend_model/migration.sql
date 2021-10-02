/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendById_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendByMeId_fkey";

-- DropTable
DROP TABLE "Friend";

-- CreateTable
CREATE TABLE "_UserFriendsUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFriendsUser_AB_unique" ON "_UserFriendsUser"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFriendsUser_B_index" ON "_UserFriendsUser"("B");

-- AddForeignKey
ALTER TABLE "_UserFriendsUser" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFriendsUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
