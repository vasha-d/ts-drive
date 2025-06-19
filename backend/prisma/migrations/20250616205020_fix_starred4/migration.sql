/*
  Warnings:

  - You are about to drop the column `starredFolderId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `starredFolderId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `fileIds` on the `StarredFolder` table. All the data in the column will be lost.
  - You are about to drop the column `folderIds` on the `StarredFolder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_starredFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_starredFolderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "starredFolderId";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "starredFolderId";

-- AlterTable
ALTER TABLE "StarredFolder" DROP COLUMN "fileIds",
DROP COLUMN "folderIds";
