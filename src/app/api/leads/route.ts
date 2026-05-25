import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, tourId, startDate, travelers, status } = data;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Upsert lead in database
    const lead = await prisma.lead.upsert({
      where: { email },
      update: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        tourId: tourId || undefined,
        startDate: startDate || undefined,
        travelers: travelers || undefined,
        status: status || "DRAFT",
      },
      create: {
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        tourId: tourId || "",
        startDate: startDate || "",
        travelers: travelers || 1,
        status: status || "DRAFT",
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Error saving lead to Database:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
