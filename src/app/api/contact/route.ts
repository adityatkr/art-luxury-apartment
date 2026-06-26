import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactConfirmation } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: { name, email, phone: phone ?? null, subject, message, status: "new" },
    });

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await sendContactConfirmation(enquiry);
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({ success: true, id: enquiry.id });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
