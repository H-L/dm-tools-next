// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { outputFile } from "fs-extra";

export async function GET(req: NextRequest) {
  return NextResponse.json({ Message: "Success", status: 200 });
}
// Define the POST handler for the file upload
export async function POST(req: NextRequest) {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data
  const mapName = formData.get("mapName");
  const file = formData.get("mapFile") as File;

  console.log(mapName, file);

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

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);

  const mapImagePath = `public/images/tiles/${mapName}/${filename}`;

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    // await outputFile(
    //   path.join(process.cwd(), mapImagePath),
    //   buffer
    // );

    // TODO Enregistrer la map en DB
    // TODO Lancer le script pour générer les tiles

    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
