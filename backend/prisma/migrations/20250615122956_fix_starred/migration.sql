/*
  Warnings:

  - Added the required column `sharedFolderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sharedFolderId" INTEGER NOT NULL;
