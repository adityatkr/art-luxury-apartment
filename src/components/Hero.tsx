"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SLIDES = [
  { src: "/images/hotel-render.webp",   alt: "Art Apartment at Sunset" },
  { src: "/images/bedroom.webp",        alt: "Sora Suite Bedroom" },
  { src: "/images/living-room.webp",    alt: "Suite Living Room" },
  { src: "/images/bathroom.webp",       alt: "Luxury Bathroom" },
  { src: "/images/kitchen.webp",        alt: "Equipped Kitchen" },
  { src: "/images/art-wall.webp",       alt: "Suite Art Wall" },
  { src: "/images/corridor.webp",       alt: "Apartment Corridor" },
  { src: "/images/room-interior.webp",  alt: "Smart Room" },
];

export default function Hero() {
  const { lang } = useLanguage();

  const T = {
    en: {
      h1: "The Pinnacle of Luxury Living",
      subtitle: "Premium Japanese-Friendly Apartment in Gurugram",
      desc: "Spacious 1 BHK suites, two restaurants, and dedicated Japanese hospitality — built for extended corporate stays.",
      chips: ["Japanese Friendly", "1 BHK Suites", "In-house Restaurant", "Golf Course Road", "Long Stay Specialists", "Corporate Ready"],
      roomType: "Room Type", checkIn: "Check-in", checkOut: "Check-out",
      explore: "Explore Rooms", contactUs: "Contact Us", checkAvail: "Check Availability",
    },
    ja: {
      h1: "至高のラグジュアリー滞在",
      subtitle: "グルグラムのプレミアム日本人フレンドリーアパートメント",
      desc: "広々とした1BHKスイート、2つのレストラン、そして専任の日本のおもてなし — 長期法人滞在のために設計。",
      chips: ["日本人フレンドリー", "1BHKスイート", "館内レストラン", "ゴルフコースロード", "長期滞在専門", "法人対応"],
      roomType: "客室タイプ", checkIn: "チェックイン", checkOut: "チェックアウト",
      explore: "客室を見る", contactUs: "お問い合わせ", checkAvail: "空室確認",
    },
  }[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [room, setRoom] = useState("Sora Suites 1 BHK");

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[640px] flex flex-col overflow-hidden bg-[#09090F]">
      {/* Slideshow background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#7357FF]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-[#FF8A45]/10 blur-[100px]" />
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-400 ${i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-label mb-5"
        >
          517, Sector 27 · Golf Course Road, Gurugram
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-white leading-[1.15] mb-3 font-light"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            fontFamily: "var(--font-noto-sans-jp), sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          {T.h1}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/60 mb-6 tracking-[0.08em]"
          style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
        >
          {T.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-white/50 text-[14px] leading-[1.8] mb-8 max-w-[460px] tracking-[0.03em]"
        >
          {T.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {T.chips.map((chip) => (
            <span
              key={chip}
              className="text-[11px] font-medium text-white/70 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm bg-white/[0.04]"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex gap-3"
        >
          <a href="#rooms" className="btn-rainbow text-[14px] font-semibold px-8 py-3.5 rounded-full">
            <span>{T.explore}</span>
          </a>
          <a
            href="#contact"
            className="text-[14px] font-semibold px-8 py-3.5 rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all"
          >
            {T.contactUs}
          </a>
        </motion.div>
      </motion.div>

      {/* Quick booking widget */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 max-w-[900px] mx-auto w-full px-4 pb-10"
        id="booking"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 min-w-0">
            <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-1.5">{T.roomType}</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full bg-transparent text-white text-[14px] font-medium outline-none border-b border-white/15 pb-1"
            >
              <option value="Sora Suites 1 BHK" className="bg-[#0F0F1A]">Sora Suites 1 BHK</option>
              <option value="Sora Suites 1 BHK with Bathtub" className="bg-[#0F0F1A]">1 BHK with Bathtub</option>
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-1.5">{T.checkIn}</label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-white text-[14px] outline-none border-b border-white/15 pb-1 [color-scheme:dark]"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-1.5">{T.checkOut}</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-white text-[14px] outline-none border-b border-white/15 pb-1 [color-scheme:dark]"
            />
          </div>
          <a
            href="#rooms"
            className="btn-rainbow text-[13px] font-semibold px-6 py-3 rounded-xl whitespace-nowrap flex-shrink-0"
          >
            <span>{T.checkAvail}</span>
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={22} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
