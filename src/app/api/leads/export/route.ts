import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    // Fetch all leads from database
    const leads = await prisma.lead.findMany({
      orderBy: { updatedAt: "desc" },
    });

    // Format data for Excel
    const data = leads.map((lead) => ({
      "First Name": lead.firstName,
      "Last Name": lead.lastName,
      Email: lead.email,
      Phone: lead.phone,
      "Tour ID": lead.tourId,
      "Start Date": lead.startDate,
      Travelers: lead.travelers,
      Status: lead.status,
      "Last Updated": lead.updatedAt.toLocaleString(),
    }));

    // Create Excel Workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Adjust column widths
    const wscols = [
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 10 }, // Tour ID
      { wch: 15 }, // Start Date
      { wch: 10 }, // Travelers
      { wch: 10 }, // Status
      { wch: 25 }, // Last Updated
    ];
    worksheet["!cols"] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Return as downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="shamaal-leads.xlsx"',
      },
    });
  } catch (error) {
    console.error("Export Leads Error:", error);
    return NextResponse.json({ error: "Failed to export leads" }, { status: 500 });
  }
}
