import { prisma } from "@/db";
export default async function findMapById(mapId: number) {
  return await prisma.map.findFirst({
    where: {
      id: mapId,
    },
  });
}
