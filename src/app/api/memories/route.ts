import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

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
    // Return empty array instead of error to let frontend use fallbacks if needed
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const author = formData.get("author") as string;

    if (!file || !title || !location || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");
    const uploadPath = path.join(process.cwd(), "public/uploads/memories", filename);

    await writeFile(uploadPath, buffer);

    const memory = await prisma.memory.create({
      data: {
        title,
        location,
        author,
        image: `/uploads/memories/${filename}`,
        approved: true,
      },
    });

    return NextResponse.json({ success: true, memory });
  } catch (error: unknown) {
    console.error("POST Memory Error:", error);
    
    // Check if it's a Prisma connection error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P1001') {
      return NextResponse.json({ 
        error: "Database connection failed. Please ensure your MySQL server is running." 
      }, { status: 503 });
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to upload memory. " + message }, { status: 500 });
  }
}
