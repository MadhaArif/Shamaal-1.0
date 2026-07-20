import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const deleteToken = body?.deleteToken as string | undefined;

    if (!deleteToken) {
      return NextResponse.json({ error: "Delete token is required." }, { status: 400 });
    }

    const memory = await prisma.memory.findUnique({ where: { id } });

    if (!memory || !memory.deleteToken || memory.deleteToken !== deleteToken) {
      return NextResponse.json({ error: "You can only delete your own memories." }, { status: 403 });
    }

    if (memory.image.startsWith("/uploads/memories/")) {
      const filePath = path.join(process.cwd(), "public", memory.image);
      try {
        await unlink(filePath);
      } catch {
        // File may already be missing; continue with DB delete
      }
    }

    await prisma.memory.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("DELETE Memory Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to delete memory. " + message }, { status: 500 });
  }
}
