import { prisma } from "@/db";

interface CreateMapParams {
  mapName: string;
  mapPath: string;
  originalFilename: string;
  width: number;
  height: number;
  type: string;
}

export async function createMapInDb({
  mapName,
  mapPath,
  originalFilename,
  width,
  height,
  type,
}: CreateMapParams) {
  await prisma.map.create({
    data: {
      name: mapName,
      tilesPath: mapPath,
      originalFilename,
      width,
      height,
      type,
    },
  });

  // Close DB connection
  await prisma.$disconnect();
}
