import { prisma } from "@/db";
import { Map } from "@prisma/client";

export async function deleteMapInDb(id: Map["id"]) {
  return await prisma.map.delete({ where: { id } });
}
