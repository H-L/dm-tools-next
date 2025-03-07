import sizeOf from "buffer-image-size";
import { outputFile } from "fs-extra";
import path from "path";

import { createMapInDb } from "@/src/infrastructure/repositories/maps/createMapInDb";
import { createMapTiles } from "@/src/infrastructure/repositories/maps/createMapTiles";
import { buildMapPath } from "@/src/utils/buildMapPath";

export async function createMapFromFile(mapName: string, file: File) {
  if (!mapName) {
    throw new Error("No map name provided");
  }

  if (!file) {
    throw new Error("No file received");
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  const dimensions = await sizeOf(buffer);

  if (!dimensions) {
    throw new Error("Failed to get image dimensions");
  }

  if (!dimensions.width || !dimensions.height) {
    throw new Error(
      `Invalid image dimensions: ${dimensions.width}x${dimensions.height}`
    );
  }

  try {
    const { fullMapPath, mapPath, originalFilename } = buildMapPath(
      mapName,
      file.name
    );

    // Write the file to a local server directory, to work asynchronously on it without blocking the final user / client
    await outputFile(path.join(process.cwd(), fullMapPath), buffer);

    // Creates the map tiles in the dedicated server
    await createMapTiles(mapName, file);

    // Create a new map element in Prisma DB
    await createMapInDb({
      mapName,
      mapPath,
      originalFilename,
      ...dimensions,
    });
  } catch (error) {
    // TODO: Create custom error ?
    throw new Error("Failed to upload map", {});
  }
}
