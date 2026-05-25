import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET bookings from the database (filtered by user if logged in)
export async function GET() {
  try {
    const session = await auth();
    
    const whereClause = session?.user?.email 
      ? { user: { email: session.user.email } } 
      : {};

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        tour: true,
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const mappedBookings = bookings.map((b) => ({
      id: `BK-${new Date(b.createdAt).getFullYear()}-${b.id.substring(0, 4).toUpperCase()}`,
      tour: b.tour.title,
      location: b.tour.location,
      startDate: b.startDate.toISOString().split("T")[0],
      duration: b.tour.duration,
      travelers: b.travelers,
      totalPrice: b.totalPrice,
      status: b.status,
      image: b.tour.images.split(",")[0],
      userName: b.user.name || "Guest",
      userEmail: b.user.email
    }));

    return NextResponse.json(mappedBookings);
  } catch (error) {
    console.error("GET Bookings Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

// POST a new booking to the database
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tourId, startDate, travelers, totalPrice, firstName, lastName, email } = body;

    if (!tourId || !startDate || !travelers || !totalPrice || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Find or create the user profile
    const fullName = `${firstName} ${lastName}`.trim() || "Traveler";
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: fullName,
          role: "USER"
        }
      });
    }

    // 2. Create the new booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        tourId,
        startDate: new Date(startDate),
        travelers: parseInt(travelers),
        totalPrice: parseFloat(totalPrice),
        status: "CONFIRMED" // Auto-confirm bookings for testing/local experience
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("POST Booking Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
