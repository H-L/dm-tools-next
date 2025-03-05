// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { outputFile } from "fs-extra";
import { prisma } from "@/db";
import sizeOf from "buffer-image-size";

interface CreateMapParams {
  mapName: string;
  mapPath: string;
  originalFilename: string;
  width: number;
  height: number;
  type: string;
}

async function createMapInDb({
  mapName,
  mapPath,
  originalFilename,
  width,
  height,
  type,
}: CreateMapParams) {
  await prisma.map.create({
    data: {
      name: mapName,
      tilesPath: mapPath,
      originalFilename,
      width,
      height,
      type,
    },
  });
}

export async function POST(req: NextRequest) {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data
  const mapName = formData.get("mapName") as string;
  const file = formData.get("mapFile") as File;

  if (!mapName) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json(
      { error: "No map name provided." },
      { status: 400 }
    );
  }

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  const dimensions = await sizeOf(buffer);
  // Replace spaces in the file name with underscores
  const originalFilename = file.name.replaceAll(" ", "_");
  const mapPath = `tiles/${mapName}/`;
  const fullMapPath = `public/images/${mapPath}/${originalFilename}`;

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await outputFile(path.join(process.cwd(), fullMapPath), buffer);

    // Set formData for POST request to tiles service
    const tilesPostFormData = new FormData();
    tilesPostFormData.append("mapName", mapName);
    tilesPostFormData.append("originalFileName", file);

    const response = await fetch("http://tiles:8001/tiles", {
      method: "POST",
      body: tilesPostFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload tiles");
    }

    // Create a new map element in Prisma DB
    await createMapInDb({
      mapName,
      mapPath,
      originalFilename,
      ...dimensions,
    });

    // Close DB connection
    await prisma.$disconnect();

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    return NextResponse.json({ Message: "Failed", status: 500, error });
  }
}
