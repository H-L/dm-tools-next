/*
  Warnings:

  - A unique constraint covering the columns `[tilesPath]` on the table `Map` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Map_tilesPath_key" ON "Map"("tilesPath");
