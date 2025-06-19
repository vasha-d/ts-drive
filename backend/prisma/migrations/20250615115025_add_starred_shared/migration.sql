/*
  Warnings:

  - You are about to drop the `_FileToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FolderToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `starredFolderId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starredFolderId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FileToUser" DROP CONSTRAINT "_FileToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileToUser" DROP CONSTRAINT "_FileToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_FolderToUser" DROP CONSTRAINT "_FolderToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FolderToUser" DROP CONSTRAINT "_FolderToUser_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "starredFolderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "starredFolderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_FileToUser";

-- DropTable
DROP TABLE "_FolderToUser";

-- CreateTable
CREATE TABLE "StarredFolder" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "folderIds" INTEGER[],
    "fileIds" INTEGER[],

    CONSTRAINT "StarredFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedFolder" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "SharedFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FolderToSharedFolder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FolderToSharedFolder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FileToSharedFolder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FileToSharedFolder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarredFolder_ownerId_key" ON "StarredFolder"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "SharedFolder_ownerId_key" ON "SharedFolder"("ownerId");

-- CreateIndex
CREATE INDEX "_FolderToSharedFolder_B_index" ON "_FolderToSharedFolder"("B");

-- CreateIndex
CREATE INDEX "_FileToSharedFolder_B_index" ON "_FileToSharedFolder"("B");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_starredFolderId_fkey" FOREIGN KEY ("starredFolderId") REFERENCES "StarredFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_starredFolderId_fkey" FOREIGN KEY ("starredFolderId") REFERENCES "StarredFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredFolder" ADD CONSTRAINT "StarredFolder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedFolder" ADD CONSTRAINT "SharedFolder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToSharedFolder" ADD CONSTRAINT "_FolderToSharedFolder_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToSharedFolder" ADD CONSTRAINT "_FolderToSharedFolder_B_fkey" FOREIGN KEY ("B") REFERENCES "SharedFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToSharedFolder" ADD CONSTRAINT "_FileToSharedFolder_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToSharedFolder" ADD CONSTRAINT "_FileToSharedFolder_B_fkey" FOREIGN KEY ("B") REFERENCES "SharedFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
