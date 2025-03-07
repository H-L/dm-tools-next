// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { createMapFromFile } from "@/src/useCases/maps/createMapFromFile";
import { findManyMaps } from "@/src/infrastructure/repositories/maps/db/findManyMaps";

export async function GET(req: NextRequest) {
  const maps = await findManyMaps();
  return NextResponse.json(maps, { status: 200 });
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
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Create a new map from the file
  try {
    await createMapFromFile(mapName, file);

    return NextResponse.json({ Message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ Message: "Failed", error }, { status: 500 });
  }
}
