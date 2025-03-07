import { NextRequest, NextResponse } from "next/server";
import { deleteMapById } from "@/src/useCases/maps/deleteMapById";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Get the map ID from the request parameters
  const { id } = await params;
  if (typeof id !== "string" || id.length === 0) {
    return NextResponse.json({ message: "Invalid map ID." }, { status: 400 });
  }

  // Delete the map
  try {
    await deleteMapById(+id);

    return NextResponse.json(
      { message: "Map deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete map.",
        error,
      },
      { status: 500 }
    );
  }
}
