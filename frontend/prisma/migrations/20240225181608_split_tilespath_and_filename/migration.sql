/*
  Warnings:

  - A unique constraint covering the columns `[originalFilename]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalFilename` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "originalFilename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Map_originalFilename_key" ON "Map"("originalFilename");
