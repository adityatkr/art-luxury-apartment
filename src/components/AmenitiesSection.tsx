"use client";

import { motion } from "framer-motion";
import { BedDouble, Wind, Home, Wifi, Tv, Wine, Coffee, Droplets, Lock, Shirt, Bath, Star, RefreshCw, Bell, ShowerHead, UtensilsCrossed, GlassWater } from "lucide-react";

const amenities = [
  { icon: <BedDouble size={22} strokeWidth={1.3} />, label: "King Size Bed" },
  { icon: <Wind size={22} strokeWidth={1.3} />, label: "Air Conditioning" },
  { icon: <Home size={22} strokeWidth={1.3} />, label: "Separate Living Room" },
  { icon: <Wifi size={22} strokeWidth={1.3} />, label: "High Speed WiFi" },
  { icon: <Tv size={22} strokeWidth={1.3} />, label: "43\" Smart TV" },
  { icon: <UtensilsCrossed size={22} strokeWidth={1.3} />, label: "Complimentary Breakfast" },
  { icon: <GlassWater size={22} strokeWidth={1.3} />, label: "Complimentary Drinks" },
  { icon: <Shirt size={22} strokeWidth={1.3} />, label: "Complimentary Laundry (4 pcs)" },
  { icon: <Wine size={22} strokeWidth={1.3} />, label: "Mini Bar" },
  { icon: <Coffee size={22} strokeWidth={1.3} />, label: "Tea & Coffee Maker" },
  { icon: <Droplets size={22} strokeWidth={1.3} />, label: "Complimentary Water" },
  { icon: <Lock size={22} strokeWidth={1.3} />, label: "Room Safe" },
  { icon: <Shirt size={22} strokeWidth={1.3} />, label: "Wardrobe" },
  { icon: <Bath size={22} strokeWidth={1.3} />, label: "Bathrobe" },
  { icon: <Star size={22} strokeWidth={1.3} />, label: "Slippers" },
  { icon: <RefreshCw size={22} strokeWidth={1.3} />, label: "Laundry Service" },
  { icon: <Bell size={22} strokeWidth={1.3} />, label: "24×7 Room Service" },
  { icon: <ShowerHead size={22} strokeWidth={1.3} />, label: "Bathtub (Premium)" },
];

export default function AmenitiesSection() {
  return (
    <section className="bg-[#F7F8FA] py-28" id="amenities">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Room Amenities</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            充実したアメニティ
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">Everything You Need, Nothing You Don&apos;t</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
              whileHover={{ y: -4 }}
              className="group glass-card grad-border-hover flex flex-col items-center text-center p-4 rounded-2xl cursor-default transition-all duration-300 hover:bg-white/[0.06]"
            >
              <div className="grad-text mb-3 group-hover:scale-110 transition-transform duration-300">{a.icon}</div>
              <p className="text-[#6B7280] text-[12px] leading-tight font-medium group-hover:text-[#1A1A2A] transition-colors">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
