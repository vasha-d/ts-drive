/*
  Warnings:

  - A unique constraint covering the columns `[starredParentId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[starredParentId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `starredParentId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starredParentId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "starredParentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "starredParentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_starredParentId_key" ON "File"("starredParentId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_starredParentId_key" ON "Folder"("starredParentId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_starredParentId_fkey" FOREIGN KEY ("starredParentId") REFERENCES "StarredFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_starredParentId_fkey" FOREIGN KEY ("starredParentId") REFERENCES "StarredFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
