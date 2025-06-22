/*
  Warnings:

  - You are about to drop the column `link` on the `File` table. All the data in the column will be lost.
  - Added the required column `publicId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceType` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "link",
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD COLUMN     "resourceType" TEXT NOT NULL;
