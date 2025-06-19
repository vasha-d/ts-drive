-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_starredParentId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_starredParentId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "starredParentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "starredParentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_starredParentId_fkey" FOREIGN KEY ("starredParentId") REFERENCES "StarredFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_starredParentId_fkey" FOREIGN KEY ("starredParentId") REFERENCES "StarredFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
