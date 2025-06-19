/*
  Warnings:

  - You are about to drop the column `ownerId` on the `SharedFolder` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `StarredFolder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sharedFolderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[starredFolderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sharedFolderId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starredFolderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SharedFolder" DROP CONSTRAINT "SharedFolder_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "StarredFolder" DROP CONSTRAINT "StarredFolder_ownerId_fkey";

-- DropIndex
DROP INDEX "SharedFolder_ownerId_key";

-- DropIndex
DROP INDEX "StarredFolder_ownerId_key";

-- AlterTable
ALTER TABLE "SharedFolder" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "StarredFolder" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sharedFolderId" INTEGER NOT NULL,
ADD COLUMN     "starredFolderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sharedFolderId_key" ON "User"("sharedFolderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_starredFolderId_key" ON "User"("starredFolderId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sharedFolderId_fkey" FOREIGN KEY ("sharedFolderId") REFERENCES "SharedFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_starredFolderId_fkey" FOREIGN KEY ("starredFolderId") REFERENCES "StarredFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
