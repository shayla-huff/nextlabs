 import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.profiles.delete({
      where: { id },
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
