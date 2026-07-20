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
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV Content
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Tour/Interest",
      "Message",
      "Start Date",
      "Travelers",
      "Status",
      "Created At"
    ];

    const rows = leads.map(lead => [
      lead.id,
      lead.firstName || "",
      lead.lastName || "",
      lead.email,
      lead.phone || "",
      lead.tourId || "",
      (lead.message || "").replace(/"/g, '""'), // Escape double quotes
      lead.startDate || "",
      lead.travelers,
      lead.status,
      lead.createdAt.toISOString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${val}"`).join(","))
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=shamaal_leads_${new Date().toISOString().split("T")[0]}.csv`,
      },
    });
  } catch (error) {
    console.error("Export Leads Error:", error);
    return new NextResponse("Failed to export leads", { status: 500 });
  }
}
