import { prisma } from "@/db";

export async function fetchMap({ id }: { id: number }) {
  return await prisma.map.findFirstOrThrow({ where: { id } });
}

export async function deleteMap({ id }: { id: number }) {
  return await prisma.map.delete({ where: { id } });
}
