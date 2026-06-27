"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const restaurants = [
  {
    id: "arata",
    imageSrc: "/images/arata-logo.png",
    name: "Arata",
    tagline: "Fine Japanese Fusion Dining",
    cuisine: ["Indian", "Japanese Fusion"],
    features: ["Fine Dining", "Buffet Available", "No Alcohol"],
    timings: "6:00 AM – 10:30 PM",
    desc: "Arata offers an exquisite journey through Japanese and Indian cuisines. Our in-house fine dining restaurant serves authentic flavours crafted by skilled chefs in an elegant, intimate setting.",
  },
  {
    id: "kaffee",
    imageSrc: "/images/kaffee-stories.png",
    name: "Kaffee Stories",
    tagline: "Rooftop Café & Soft Bar",
    cuisine: ["Indian", "Chinese Fusion"],
    features: ["Rooftop Café", "Soft Bar", "City Views"],
    timings: "8:00 AM – 10:30 PM",
    desc: "Perched above Gurgaon's skyline, Kaffee Stories is the perfect spot for a relaxed meal, casual meeting, or evening unwind — with an Indian-Chinese fusion menu and curated soft drinks.",
  },
];

export default function RestaurantsSection() {
  return (
    <section className="bg-white py-28" id="restaurants">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Dining at Art</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            お食事のご案内
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">Two Exceptional Restaurants, One Apartment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {restaurants.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group glass-card grad-border-hover rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden" style={{ height: r.id === "kaffee" ? "340px" : "260px", background: r.id === "arata" ? "#0A0A0A" : r.id === "kaffee" ? "#0A0A14" : undefined }}>
                <img src={r.imageSrc} alt={r.name} className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${r.id === "kaffee" || r.id === "arata" ? "object-contain" : "object-cover"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-white text-[22px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{r.name}</h3>
                    <p className="text-white/50 text-[12px]">{r.tagline}</p>
                  </div>
                </div>
                {/* Gradient bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #7357FF, #FF8A45)" }} />
              </div>

              <div className="p-6 flex-1">
                <p className="text-[14px] text-[#6B7280] leading-[1.75] mb-5">{r.desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="section-label text-[10px] mb-2">Cuisine</p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.cuisine.map((c) => (
                        <span key={c} className="bg-[#F7F8FA] text-[#6B7280] text-[11px] px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="section-label text-[10px] mb-2">Features</p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.features.map((f) => (
                        <span key={f} className="bg-[#F7F8FA] text-[#6B7280] text-[11px] px-2.5 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF] pt-4 border-t border-[#F3F4F6]">
                  <Clock size={14} className="grad-text" strokeWidth={1.5} />
                  <span className="font-medium text-[#374151]">Open:</span>
                  <span>{r.timings}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
