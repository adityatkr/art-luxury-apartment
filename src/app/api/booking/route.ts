import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/mailer";
import { appendBookingToSheet } from "@/lib/sheets";

const ROOM_RATES: Record<string, { roomOnly: { single: number; double: number }; breakfast: { single: number; double: number } }> = {
  "Sora Suites 1 BHK": {
    roomOnly: { single: 5000, double: 6000 },
    breakfast: { single: 6000, double: 7000 },
  },
  "Sora Suites 1 BHK with Bathtub": {
    roomOnly: { single: 6000, double: 7000 },
    breakfast: { single: 7000, double: 7500 },
  },
};
const EXTRA_ADULT_RATE = 1000;
const GST_RATE = 0.05;

function calcAmount(roomType: string, mealPlan: string, adults: number, nights: number): number {
  const rates = ROOM_RATES[roomType];
  if (!rates) return 0;
  const plan = mealPlan === "breakfast" ? rates.breakfast : rates.roomOnly;
  const baseRate = adults === 1 ? plan.single : plan.double + Math.max(0, adults - 2) * EXTRA_ADULT_RATE;
  return Math.round(baseRate * nights * (1 + GST_RATE));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, roomType, checkIn, checkOut, adults, children, mealPlan, specialReq } = body;

    if (!name || !email || !phone || !roomType || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }

    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = calcAmount(roomType, mealPlan ?? "room-only", Number(adults ?? 1), totalNights);
    const advancePaid = Math.round(totalAmount * 0.25);

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        roomType,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: Number(adults ?? 1),
        children: Number(children ?? 0),
        mealPlan: mealPlan ?? "room-only",
        specialReq: specialReq ?? null,
        totalNights,
        totalAmount,
        advancePaid,
        status: "pending",
      },
    });

    // Send confirmation email (non-blocking)
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await sendBookingConfirmation(booking);
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    // Append to Google Sheet (non-blocking)
    appendBookingToSheet(booking).catch((err) =>
      console.error("Google Sheets append failed:", err)
    );

    return NextResponse.json({ success: true, bookingId: booking.id, totalAmount, advancePaid, totalNights });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const adminKey = process.env.ADMIN_SECRET;
  if (!adminKey) return NextResponse.json({ error: "Not configured" }, { status: 403 });
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(bookings);
}
