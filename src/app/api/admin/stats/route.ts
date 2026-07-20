import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    // Check if user is admin
    if (process.env.NODE_ENV === "production") {
      const role = (session?.user as { role?: string })?.role;
      if (role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const [bookings, leads, memories] = await Promise.all([
      prisma.booking.findMany({
        include: { tour: true, user: true },
        orderBy: { createdAt: "desc" }
      }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" }
      }),
      prisma.memory.findMany({
        orderBy: { createdAt: "desc" }
      })
    ]);

    return NextResponse.json({
      stats: {
        totalBookings: bookings.length,
        totalLeads: leads.length,
        totalMemories: memories.length,
        revenue: bookings.reduce((acc, b) => acc + b.totalPrice, 0)
      },
      bookings,
      leads,
      memories
    });
  } catch (error) {
    console.error("Admin Data Error:", error);
    return NextResponse.json({ error: "Failed to fetch admin data" }, { status: 500 });
  }
}
