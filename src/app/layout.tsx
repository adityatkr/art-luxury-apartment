import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://artluxuryapartment.com"),
  title: "Art: The Luxury Serviced Apartment | Premium Japanese-Friendly Hotel in Gurgaon",
  description:
    "Premium serviced apartments on Golf Course Road, Gurgaon. Spacious 1 BHK suites with separate living room, kitchen, Japanese restaurant Arata, and 24×7 service.",
  keywords:
    "Art The Luxury Serviced Apartment Gurgaon, Corporate Long Stay Hotel Gurgaon, Premium Serviced Apartment Gurgaon, Japanese Hotel in Gurgaon, Japanese Corporate Stay Gurgaon, Premium Japanese-Friendly Hotel Gurgaon, Japanese Style Apartments Gurgaon, Long Stay Hotel Gurgaon, Luxury Short Stay Apartments Gurgaon, Luxury Long Stay Apartments Gurgaon, Japanese Luxury Service Apartment Gurgaon, Fully Furnished Apartment Gurgaon",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Art: The Luxury Serviced Apartment | Premium Japanese-Friendly Hotel in Gurgaon",
    description:
      "Luxury serviced apartments on Golf Course Road, Gurgaon. In-house Japanese restaurant Arata, spacious suites, premium amenities.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSansJP.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-white text-[#1A1A2A] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
