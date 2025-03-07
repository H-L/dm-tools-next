export const buildMapPath = (mapName: string, filename: string) => {
  // Replace spaces in the file name with underscores
  const originalFilename = filename.replaceAll(" ", "_");

  // TODO: Create constants for `tiles` and `public/images`
  const mapPath = `tiles/${mapName}/`;
  const fullMapPath = `public/images/${mapPath}/${originalFilename}`;
  return { mapPath, fullMapPath, originalFilename };
};
