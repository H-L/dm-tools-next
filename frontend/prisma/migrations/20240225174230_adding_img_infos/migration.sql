/*
  Warnings:

  - Added the required column `height` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
