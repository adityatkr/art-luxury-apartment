import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
  title: "Art: Luxury Serviced Apartment | Premium Japanese-Friendly Apartment in Gurugram",
  description:
    "Premium serviced apartments on Golf Course Road, Gurugram. Spacious 1 BHK suites with separate living room, kitchen, Japanese restaurant Arata, and 24×7 service.",
  keywords:
    "Art The Luxury Serviced Apartment Gurugram, Corporate Long Stay Apartment Gurugram, Premium Serviced Apartment Gurugram, Japanese Apartment in Gurugram, Japanese Corporate Stay Gurugram, Premium Japanese-Friendly Hotel Gurugram, Japanese Style Apartments Gurugram, Long Stay Apartment Gurugram, Luxury Short Stay Apartments Gurugram, Luxury Long Stay Apartments Gurugram, Japanese Luxury Service Apartment Gurugram, Fully Furnished Apartment Gurugram",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Art: Luxury Serviced Apartment | Premium Japanese-Friendly Apartment in Gurugram",
    description:
      "Luxury serviced apartments on Golf Course Road, Gurugram. In-house Japanese restaurant Arata, spacious suites, premium amenities.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSansJP.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-white text-[#1A1A2A] font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
