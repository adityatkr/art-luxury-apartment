import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });

  const fmt = (d: Date | string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const rows = [
    ["Booking ID", "Submitted On", "Name", "Email", "Phone", "Room Type",
      "Check-in", "Check-out", "Nights", "Adults", "Children", "Meal Plan",
      "Special Requests", "Total (incl. GST)", "Advance (25%)", "Status"],
    ...bookings.map((b) => [
      `#${b.id.slice(-6).toUpperCase()}`,
      new Date(b.createdAt).toLocaleString("en-IN"),
      b.name,
      b.email,
      b.phone,
      b.roomType,
      fmt(b.checkIn),
      fmt(b.checkOut),
      b.totalNights,
      b.adults,
      b.children,
      b.mealPlan === "breakfast" ? "With Breakfast" : "Room Only",
      b.specialReq ?? "",
      b.totalAmount,
      b.advancePaid,
      b.status,
    ]),
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws["!cols"] = [
    { wch: 12 }, { wch: 20 }, { wch: 20 }, { wch: 28 }, { wch: 16 },
    { wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 8  }, { wch: 8  },
    { wch: 10 }, { wch: 16 }, { wch: 30 }, { wch: 18 }, { wch: 16 }, { wch: 12 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Bookings");
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="art-bookings-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
