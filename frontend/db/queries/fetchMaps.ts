import { db } from "@/db";

export async function fetchMaps() {
  return await db.map.findMany();
}
