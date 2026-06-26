"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, Tag, ArrowRight } from "lucide-react";

const BOOK_TODAY_IMAGES = [
  { src: "/images/bedroom.png",     pos: "object-center" },
  { src: "/images/living-room.png", pos: "object-center" },
  { src: "/images/bathroom.png",    pos: "object-top" },
];

const VIEW_RATES_IMAGES = [
  { src: "/images/kitchen.png",    pos: "object-center" },
  { src: "/images/art-wall.png",   pos: "object-top" },
  { src: "/images/corridor.png",   pos: "object-center" },
];

export default function OffersSection() {
  return (
    <section className="bg-[#F7F8FA] py-28" id="offers">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Special Offers</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            特別なご提案
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">Great Value, Every Stay</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* ── Card 1: Early Bird (gradient, no image) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl p-8 flex flex-col transition-all duration-300 text-white shadow-xl"
            style={{ background: "linear-gradient(135deg, #7357FF 0%, #C344D8 50%, #FF8A45 100%)" }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/15">
              <CalendarDays size={24} strokeWidth={1.5} className="text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2 text-white/70">Plan Ahead</span>
            <h3 className="text-[24px] font-bold text-white leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Early Bird</h3>
            <p className="text-[13px] font-medium mb-4 text-white/80">Book 2 Days in Advance</p>
            <p className="text-[14px] leading-[1.75] flex-1 mb-8 text-white/70">Secure the best rate by booking at least 2 days before your arrival. Enjoy a relaxed stay knowing your suite is confirmed.</p>
            <a href="#rooms" className="flex items-center gap-2 text-[13px] font-semibold hover:gap-3 transition-all duration-200 text-white">
              Book Early <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* ── Card 2: Last Minute — Book Today (with collage) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl overflow-hidden flex flex-col bg-white border border-[#F3F4F6] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Collage */}
            <div className="grid grid-cols-2 grid-rows-2 gap-[2px] h-[200px] flex-shrink-0">
              <div className="row-span-2 overflow-hidden">
                <img src={BOOK_TODAY_IMAGES[0].src} alt="Suite bedroom" className={`w-full h-full object-cover ${BOOK_TODAY_IMAGES[0].pos} transition-transform duration-700 hover:scale-105`} />
              </div>
              <div className="overflow-hidden">
                <img src={BOOK_TODAY_IMAGES[1].src} alt="Living room" className={`w-full h-full object-cover ${BOOK_TODAY_IMAGES[1].pos} transition-transform duration-700 hover:scale-105`} />
              </div>
              <div className="overflow-hidden">
                <img src={BOOK_TODAY_IMAGES[2].src} alt="Bathroom" className={`w-full h-full object-cover ${BOOK_TODAY_IMAGES[2].pos} transition-transform duration-700 hover:scale-105`} />
              </div>
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7357FF20, #FF8A4520)" }}>
                  <Clock size={20} strokeWidth={1.5} className="grad-text" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#9CA3AF]">Same Day</span>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A2A] leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Last Minute Deal</h3>
              <p className="text-[13px] font-medium mb-3 grad-text">Same-Day Bookings</p>
              <p className="text-[14px] text-[#6B7280] leading-[1.75] flex-1 mb-6">Need a suite today? Our last-minute deal offers spontaneous travelers premium comfort at special rates for same-day check-in.</p>
              <a href="#rooms" className="flex items-center gap-2 text-[13px] font-semibold hover:gap-3 transition-all duration-200 grad-text">
                Book Today <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* ── Card 3: Basic Rate — View Rates (with collage) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.24 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl overflow-hidden flex flex-col bg-white border border-[#F3F4F6] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Collage — 3 equal-height horizontal strips */}
            <div className="grid grid-cols-3 gap-[2px] h-[200px] flex-shrink-0">
              {VIEW_RATES_IMAGES.map((img, i) => (
                <div key={i} className="overflow-hidden">
                  <img src={img.src} alt="" className={`w-full h-full object-cover ${img.pos} transition-transform duration-700 hover:scale-105`} />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7357FF20, #FF8A4520)" }}>
                  <Tag size={20} strokeWidth={1.5} className="grad-text" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#9CA3AF]">Always On</span>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A2A] leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Basic Rate</h3>
              <p className="text-[13px] font-medium mb-3 grad-text">Best Available Rate</p>
              <p className="text-[14px] text-[#6B7280] leading-[1.75] flex-1 mb-6">Our standard Best Available Rate — always competitive, always transparent. No hidden charges, just honest pricing for premium stays.</p>
              <a href="#rooms" className="flex items-center gap-2 text-[13px] font-semibold hover:gap-3 transition-all duration-200 grad-text">
                View Rates <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
