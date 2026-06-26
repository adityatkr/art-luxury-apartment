"use client";

import { motion } from "framer-motion";
import { MapPin, Train, ShoppingBag } from "lucide-react";

const attractions = [
  { icon: <MapPin size={18} strokeWidth={1.5} />, name: "Golf Course Road", desc: "Prime commercial and residential corridor — at your doorstep", distance: "On-site" },
  { icon: <Train size={18} strokeWidth={1.5} />, name: "DLF Phase 1 Rapid Metro", desc: "Quick metro connectivity to Gurgaon's business hubs", distance: "5 min" },
  { icon: <MapPin size={18} strokeWidth={1.5} />, name: "CyberHub", desc: "Gurgaon's iconic dining and entertainment district", distance: "10 min" },
  { icon: <ShoppingBag size={18} strokeWidth={1.5} />, name: "Global Foyer Mall", desc: "Premium retail, dining, and entertainment complex", distance: "8 min" },
  { icon: <ShoppingBag size={18} strokeWidth={1.5} />, name: "South Point Mall", desc: "Everyday shopping and dining convenience nearby", distance: "10 min" },
];

export default function NearbySection() {
  return (
    <section className="bg-white py-28" id="location">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">Location</p>
            <h2 className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
              style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
              ゴルフコースロード
            </h2>
            <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase mb-6">At the Heart of Golf Course Road</p>
            <p className="text-[15px] text-[#6B7280] leading-[1.8] mb-10">
              517, Sector 27 places you on one of Gurgaon&apos;s most prestigious addresses — surrounded by top businesses, world-class malls, and excellent metro connectivity.
            </p>

            <div className="flex flex-col gap-4">
              {attractions.map((a, i) => (
                <motion.div key={a.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card grad-border-hover flex items-start gap-4 rounded-2xl p-4 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 grad-text" style={{ background: "rgba(115, 87, 255, 0.1)" }}>
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-[14px] font-semibold text-[#1A1A2A]">{a.name}</h4>
                      <span className="text-[11px] font-semibold grad-text glass-card px-2.5 py-1 rounded-full">{a.distance}</span>
                    </div>
                    <p className="text-[12px] text-[#9CA3AF]">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-white/[0.07]" style={{ background: "linear-gradient(135deg, rgba(115,87,255,0.12), rgba(255,138,69,0.08))" }}>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="grad-text mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-white mb-1">Art: The Luxury Serviced Apartment</p>
                  <p className="text-[12px] text-white/50 leading-relaxed">517, Sector 27, Golf Course Road, Gurgaon, Haryana</p>
                  <a href="tel:+917428095672" className="text-[12px] grad-text mt-2 block hover:opacity-80">+91 74280 95672</a>
                  <a href="mailto:reservation@limetreehotels.com" className="text-[12px] grad-text block hover:opacity-80">reservation@limetreehotels.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.15 }} className="sticky top-24">
            {/* ── MAP EMBED ────────────────────────────────────────────────────
                Replace with: <iframe src="https://www.google.com/maps/embed?pb=..." className="w-full h-full rounded-2xl" allowFullScreen loading="lazy" />
            ────────────────────────────────────────────────────────────── */}
            <div className="aspect-square max-h-[520px] rounded-2xl overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }}>
                <MapPin size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-semibold text-[#1A1A2A]">Art: The Luxury Serviced Apartment</p>
                <p className="text-[12px] text-[#9CA3AF] mt-1">517, Sector 27, Golf Course Road</p>
                <p className="text-[12px] text-[#9CA3AF]">Gurgaon, Haryana</p>
              </div>
              <a href="https://maps.google.com/?q=517+Sector+27+Golf+Course+Road+Gurgaon" target="_blank" rel="noopener noreferrer"
                className="btn-rainbow text-[12px] font-semibold px-5 py-2.5 rounded-full">
                <span>Open in Google Maps</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
