import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

function dbConfigErrorMessage(error: unknown): string | null {
  const message = error instanceof Error ? error.message : String(error);
  if (
    message.includes("must start with the protocol `file:`") ||
    message.includes('must start with the protocol "file:"') ||
    message.includes("Error validating datasource") ||
    message.includes("Environment variable not found: DATABASE_URL") ||
    message.includes("Can't reach database server") ||
    message.includes("P1001")
  ) {
    return (
      "Database is not configured for this server. " +
      "Set DATABASE_URL to a PostgreSQL connection string " +
      "(example: postgresql://USER:PASSWORD@HOST/DB?sslmode=require) " +
      "in your Google Cloud / hosting environment variables, then redeploy."
    );
  }
  return null;
}

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

    // Keep cloud payloads small — base64 is stored in DB for serverless hosts
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 4MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mime = file.type || "image/jpeg";
    const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;

    // Prefer saving to disk in local/dev; fall back to data URL on Google Cloud (read-only FS)
    let imagePath = dataUrl;
    if (process.env.NODE_ENV === "development") {
      try {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filename = `${Date.now()}_${safeName}`;
        const uploadDir = path.join(process.cwd(), "public/uploads/memories");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        imagePath = `/uploads/memories/${filename}`;
      } catch {
        imagePath = dataUrl;
      }
    }

    const memory = await prisma.memory.create({
      data: {
        title,
        location,
        author,
        image: imagePath,
        approved: true,
        deleteToken: randomUUID(),
      },
    });

    return NextResponse.json({ success: true, memory });
  } catch (error: unknown) {
    console.error("POST Memory Error:", error);

    const configError = dbConfigErrorMessage(error);
    if (configError) {
      return NextResponse.json({ error: configError }, { status: 500 });
    }

    if (error && typeof error === "object" && "code" in error && error.code === "P1001") {
      return NextResponse.json({
        error: "Database connection failed. Please try again later.",
      }, { status: 503 });
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to upload memory. " + message }, { status: 500 });
  }
}
