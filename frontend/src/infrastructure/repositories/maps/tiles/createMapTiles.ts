export async function createMapTiles(mapName: string, file: File) {
  // Set formData for POST request to tiles service
  const tilesPostFormData = new FormData();
  tilesPostFormData.append("mapName", mapName);
  tilesPostFormData.append("file", file);

  // TODO: Create env constants for `tiles` domain
  const response = await fetch("http://tiles:8001/tiles", {
    method: "POST",
    body: tilesPostFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload tiles");
  }
}
