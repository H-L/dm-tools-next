export default async function deleteMapTiles(mapName: string) {
  // Set formData for POST request to tiles service
  const tilesPostFormData = new FormData();
  tilesPostFormData.append("mapName", mapName);

  // TODO: Create env constants for `tiles` domain
  const response = await fetch("http://tiles:8001/tiles", {
    method: "DELETE",
    body: tilesPostFormData,
  });

  // Prevent throwing an error if no tiles are found
  if (response.status === 404) {
    // TODO: Store maps that have not been found somewhere ?
    console.log(`No tiles found for map: ${mapName}`);
    return;
  }

  if (!response.ok) {
    throw new Error("Failed to delete tiles");
  }
}
