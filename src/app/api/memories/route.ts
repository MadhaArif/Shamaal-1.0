import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const memories = await prisma.memory.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(memories);
  } catch (error) {
    console.error("GET Memories Error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const title = (formData.get("title") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const author = (formData.get("author") as string)?.trim();

    if (!file || !title || !location || !author) {
      return NextResponse.json({ error: "Please fill all fields and select a photo." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 10MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}_${safeName}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/memories");
    const uploadPath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(uploadPath, buffer);

    const memory = await prisma.memory.create({
      data: {
        title,
        location,
        author,
        image: `/uploads/memories/${filename}`,
        approved: true,
        deleteToken: randomUUID(),
      },
    });

    return NextResponse.json({ success: true, memory });
  } catch (error: unknown) {
    console.error("POST Memory Error:", error);

    if (error && typeof error === "object" && "code" in error && error.code === "P1001") {
      return NextResponse.json({
        error: "Database connection failed. Please try again later.",
      }, { status: 503 });
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to upload memory. " + message }, { status: 500 });
  }
}
