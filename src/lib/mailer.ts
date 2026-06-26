import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingConfirmation(booking: {
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
  totalNights: number;
  totalAmount: number;
  advancePaid: number;
}) {
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const hotelEmail = process.env.HOTEL_EMAIL ?? "reservation@limetreehotels.com";
  const fromEmail = process.env.FROM_EMAIL ?? `"Art: The Luxury Serviced Apartment" <${process.env.SMTP_USER}>`;

  // Email to guest
  await transporter.sendMail({
    from: fromEmail,
    to: booking.email,
    subject: `Booking Confirmed – Art: The Luxury Serviced Apartment [#${booking.id.slice(-6).toUpperCase()}]`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A14; color: #fff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7357FF, #FF8A45); padding: 32px 40px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Art: The Luxury Serviced Apartment</h1>
          <p style="margin: 4px 0 0; opacity: 0.85; font-size: 13px;">Golf Course Road, Gurgaon</p>
        </div>
        <div style="padding: 40px;">
          <h2 style="color: #C4A87A; font-size: 18px; margin-top: 0;">Booking Enquiry Received</h2>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.7;">Dear ${booking.name}, thank you for your enquiry. Our reservations team will contact you within 2 hours to confirm your booking and process the 25% advance payment.</p>
          <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 24px; margin: 24px 0; border: 1px solid rgba(255,255,255,0.08);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Booking ID</td><td style="color: #fff; font-weight: 600; font-size: 13px;">#${booking.id.slice(-6).toUpperCase()}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Room Type</td><td style="color: #fff; font-size: 13px;">${booking.roomType}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Check-in</td><td style="color: #fff; font-size: 13px;">${fmt(booking.checkIn)}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Check-out</td><td style="color: #fff; font-size: 13px;">${fmt(booking.checkOut)}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Guests</td><td style="color: #fff; font-size: 13px;">${booking.adults} Adult${booking.adults > 1 ? "s" : ""}${booking.children > 0 ? ` + ${booking.children} Child` : ""}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Meal Plan</td><td style="color: #fff; font-size: 13px;">${booking.mealPlan === "breakfast" ? "With Breakfast" : "Room Only"}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Nights</td><td style="color: #fff; font-size: 13px;">${booking.totalNights}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px; border-top: 1px solid rgba(255,255,255,0.08);">Total (incl. 5% GST)</td><td style="color: #fff; font-weight: 700; font-size: 15px; border-top: 1px solid rgba(255,255,255,0.08);">₹${booking.totalAmount.toLocaleString("en-IN")}</td></tr>
              <tr><td style="padding: 6px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Advance (25%)</td><td style="background: linear-gradient(135deg, #7357FF, #FF8A45); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; font-size: 13px;">₹${booking.advancePaid.toLocaleString("en-IN")}</td></tr>
            </table>
          </div>
          <p style="color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.7;">For any questions, contact us at <a href="mailto:${hotelEmail}" style="color: #7357FF;">${hotelEmail}</a> or call <a href="tel:+917428095672" style="color: #7357FF;">+91 74280 95672</a>.</p>
        </div>
      </div>
    `,
  });

  // Alert email to hotel
  await transporter.sendMail({
    from: fromEmail,
    to: hotelEmail,
    subject: `[NEW BOOKING] ${booking.name} – ${fmt(booking.checkIn)} to ${fmt(booking.checkOut)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #7357FF;">New Booking Enquiry</h2>
        <p><strong>ID:</strong> #${booking.id.slice(-6).toUpperCase()}</p>
        <p><strong>Guest:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${booking.phone}">${booking.phone}</a></p>
        <p><strong>Room:</strong> ${booking.roomType}</p>
        <p><strong>Check-in:</strong> ${fmt(booking.checkIn)}</p>
        <p><strong>Check-out:</strong> ${fmt(booking.checkOut)}</p>
        <p><strong>Guests:</strong> ${booking.adults} Adults, ${booking.children} Children</p>
        <p><strong>Meal Plan:</strong> ${booking.mealPlan}</p>
        <p><strong>Nights:</strong> ${booking.totalNights}</p>
        <p><strong>Total (incl. GST):</strong> ₹${booking.totalAmount.toLocaleString("en-IN")}</p>
        <p><strong>Advance Due:</strong> ₹${booking.advancePaid.toLocaleString("en-IN")}</p>
      </div>
    `,
  });
}

export async function sendContactConfirmation(enquiry: {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const hotelEmail = process.env.HOTEL_EMAIL ?? "reservation@limetreehotels.com";
  const fromEmail = process.env.FROM_EMAIL ?? `"Art: The Luxury Serviced Apartment" <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from: fromEmail,
    to: enquiry.email,
    subject: `We received your enquiry – Art: The Luxury Serviced Apartment`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7357FF, #FF8A45); padding: 28px 36px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; color: #fff; font-size: 24px;">Art: The Luxury Serviced Apartment</h1>
        </div>
        <div style="background: #0A0A14; padding: 36px; border-radius: 0 0 12px 12px; color: #fff;">
          <p style="color: rgba(255,255,255,0.75);">Dear ${enquiry.name}, thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border-left: 3px solid #7357FF; margin: 20px 0;">
            <p style="margin: 0 0 4px; color: rgba(255,255,255,0.5); font-size: 12px;">Your message:</p>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">${enquiry.message}</p>
          </div>
        </div>
      </div>
    `,
  });

  await transporter.sendMail({
    from: fromEmail,
    to: hotelEmail,
    subject: `[ENQUIRY] ${enquiry.subject} – from ${enquiry.name}`,
    html: `
      <p><strong>From:</strong> ${enquiry.name} (${enquiry.email})</p>
      <p><strong>Subject:</strong> ${enquiry.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${enquiry.message}</p>
    `,
  });
}
