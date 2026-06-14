import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, tourId, interestedIn, message, startDate, travelers, status } = data;

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
        tourId: tourId || interestedIn || undefined,
        message: message || undefined,
        startDate: startDate || undefined,
        travelers: travelers || undefined,
        status: status || "NEW",
      },
      create: {
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        tourId: tourId || interestedIn || "",
        message: message || "",
        startDate: startDate || "",
        travelers: travelers || 1,
        status: status || "NEW",
      },
    });

    // Send email notification if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Shamaal Tourism <onboarding@resend.dev>',
          to: 'Shamaaltours@gmail.com',
          subject: `New Inquiry from ${firstName} ${lastName}`,
          html: `
            <h1>New Travel Inquiry</h1>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Interested In:</strong> ${tourId || interestedIn}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          `
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    } else {
      console.log("Resend API Key not found, skipping email notification.");
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Error saving lead to Database:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
