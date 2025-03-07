import { deleteMapInDb } from "@/src/infrastructure/repositories/maps/db/deleteMapInDb";
import findMapById from "@/src/infrastructure/repositories/maps/db/findMapById";
import deleteMapTiles from "@/src/infrastructure/repositories/maps/tiles/deleteMapTiles";

export async function deleteMapById(mapId: number) {
  const map = await findMapById(mapId);
  if (!map) {
    throw new Error("Map not found");
  }

  try {
    const mapName = map.name;
    console.log(`Deleting map with name: ${mapName}`);
    await deleteMapTiles(mapName);

    await deleteMapInDb(mapId);
  } catch (error) {
    throw new Error("Failed to delete map");
  }
}
