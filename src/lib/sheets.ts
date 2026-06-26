import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

function isConfigured() {
  return Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY);
}

export async function appendBookingToSheet(booking: {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  mealPlan: string;
  specialReq?: string | null;
  totalNights: number;
  totalAmount: number;
  advancePaid: number;
  status: string;
}) {
  if (!isConfigured()) return;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Bookings!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        `#${booking.id.slice(-6).toUpperCase()}`,
        new Date().toLocaleString("en-IN"),
        booking.name,
        booking.email,
        booking.phone,
        booking.roomType,
        fmt(booking.checkIn),
        fmt(booking.checkOut),
        booking.totalNights,
        booking.adults,
        booking.children,
        booking.mealPlan === "breakfast" ? "With Breakfast" : "Room Only",
        booking.specialReq ?? "",
        `₹${booking.totalAmount.toLocaleString("en-IN")}`,
        `₹${booking.advancePaid.toLocaleString("en-IN")}`,
        booking.status,
      ]],
    },
  });
}
