"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const navLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Restaurants", href: "#restaurants" },
  { label: "Offers", href: "#offers" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A14] text-white">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <p className="text-[18px] font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Art: The Luxury Serviced Apartment</p>
            </div>
            <p className="text-[13px] text-white/45 leading-[1.8] mb-6">
              Premium Japanese-friendly apartment on Golf Course Road, Gurgaon. Designed for long stays and corporate comfort.
            </p>
            <div className="flex gap-2.5">
              {["IG", "FB", "LI"].map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[11px] font-semibold text-white/40 hover:text-white hover:border-white/40 transition-all duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 grad-text">Explore</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-white/45 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dining */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 grad-text">Dining</p>
            <div className="flex flex-col gap-5">
              {[
                { name: "Arata", sub: "Japanese Fusion · Fine Dining", time: "6:00 AM – 10:30 PM" },
                { name: "Kaffee Stories", sub: "Rooftop Café · Soft Bar", time: "8:00 AM – 10:30 PM" },
              ].map((r) => (
                <div key={r.name}>
                  <p className="text-[13px] font-semibold text-white mb-1">{r.name}</p>
                  <p className="text-[12px] text-white/35">{r.sub}</p>
                  <p className="text-[12px] text-white/35 flex items-center gap-1.5 mt-1"><Clock size={11} strokeWidth={1.5} /> {r.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 grad-text">Contact</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="grad-text mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[13px] text-white/45 leading-relaxed">517, Sector 27, Golf Course Road<br />Gurgaon, Haryana 122002</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="grad-text flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+917428095672" className="text-[13px] text-white/45 hover:text-white transition-colors">+91 74280 95672</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="grad-text flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:reservation@limetreehotels.com" className="text-[13px] text-white/45 hover:text-white transition-colors break-all">reservation@limetreehotels.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">&copy; {new Date().getFullYear()} Art: The Luxury Serviced Apartment. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms & Conditions", "Cancellation Policy"].map((link) => (
              <a key={link} href="#" className="text-[11px] text-white/25 hover:text-white/60 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
