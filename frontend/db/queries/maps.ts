import { prisma } from "@/db";

// TODO: Use fetch + NextJS routes instead of prisma directly
export async function fetchMaps() {
  return await prisma.map.findMany();
}

export async function fetchMap({ id }: { id: number }) {
  return await prisma.map.findFirstOrThrow({ where: { id } });
}

export async function deleteMap({ id }: { id: number }) {
  return await prisma.map.delete({ where: { id } });
}
