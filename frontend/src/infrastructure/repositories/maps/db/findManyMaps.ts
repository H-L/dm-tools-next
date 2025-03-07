import { prisma } from "@/db";

export async function findManyMaps() {
  return await prisma.map.findMany();
}
