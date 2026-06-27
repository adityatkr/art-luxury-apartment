"use client";

import { motion } from "framer-motion";
import { MapPin, Star, BedDouble, Users } from "lucide-react";

const stats = [
  { icon: <BedDouble size={18} strokeWidth={1.5} />, value: "32", label: "Suites" },
  { icon: <Star size={18} strokeWidth={1.5} />, value: "4.8★", label: "Rating" },
  { icon: <Users size={18} strokeWidth={1.5} />, value: "24×7", label: "Service" },
  { icon: <MapPin size={18} strokeWidth={1.5} />, value: "GCR", label: "Address" },
];

const locationTags = [
  "Near Global Foyer Mall",
  "Near South Point Mall",
  "Near CyberHub",
  "DLF Phase 1 Metro",
  "Corporate Hub",
];

export default function AboutSection() {
  return (
    <section className="bg-white py-28" id="about">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden relative">
              <img src="/images/hotel-render.png" alt="Art: The Luxury Serviced Apartment" className="w-full h-auto" />
              {/* Purple-orange gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7357FF]/20 via-transparent to-[#FF8A45]/15" />
            </div>

            {/* Location tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[60%]">
              {locationTags.map((tag) => (
                <span key={tag} className="text-[10px] text-white/80 font-medium px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-label mb-4">About the Apartment</p>
            <h2
              className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
              style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}
            >
              日本の精神、グルガオンで
            </h2>
            <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase mb-6">Where Japanese Precision Meets Indian Hospitality</p>
            <p className="text-[#6B7280] text-[15px] leading-[1.85] mb-6">
              Art: The Luxury Serviced Apartment sits at 517, Sector 27 on the prestigious Golf Course Road — one of Gurgaon&apos;s most sought-after corporate addresses. We are the preferred choice for Japanese executives, expat professionals, and discerning corporate travelers.
            </p>
            <p className="text-[#6B7280] text-[15px] leading-[1.85] mb-10">
              Our 32 spacious 1 BHK suites offer the rare combination of a fully equipped kitchen, separate living room, and premium service — making long stays genuinely comfortable.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-4 flex flex-col items-center text-center">
                  <div className="grad-text mb-2">{s.icon}</div>
                  <p className="text-[18px] font-bold text-[#1A1A2A]">{s.value}</p>
                  <p className="text-[11px] text-[#6B7280] uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
