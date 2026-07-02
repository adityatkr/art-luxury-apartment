"use client";

import { motion } from "framer-motion";
import { BedDouble, Wind, Home, Wifi, Tv, Wine, Coffee, Droplets, Lock, Shirt, Bath, Star, RefreshCw, Bell, ShowerHead, UtensilsCrossed, GlassWater, Sparkles, ChefHat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [
  <BedDouble key="bed" size={22} strokeWidth={1.3} />, <Wind key="wind" size={22} strokeWidth={1.3} />,
  <Home key="home" size={22} strokeWidth={1.3} />, <Wifi key="wifi" size={22} strokeWidth={1.3} />,
  <Tv key="tv" size={22} strokeWidth={1.3} />, <UtensilsCrossed key="utensils" size={22} strokeWidth={1.3} />,
  <GlassWater key="glass" size={22} strokeWidth={1.3} />, <Shirt key="shirt1" size={22} strokeWidth={1.3} />,
  <Wine key="wine" size={22} strokeWidth={1.3} />, <Coffee key="coffee" size={22} strokeWidth={1.3} />,
  <Droplets key="drops" size={22} strokeWidth={1.3} />, <Lock key="lock" size={22} strokeWidth={1.3} />,
  <Shirt key="shirt2" size={22} strokeWidth={1.3} />, <Bath key="bath" size={22} strokeWidth={1.3} />,
  <Star key="star" size={22} strokeWidth={1.3} />, <RefreshCw key="refresh" size={22} strokeWidth={1.3} />,
  <Bell key="bell" size={22} strokeWidth={1.3} />, <ShowerHead key="shower" size={22} strokeWidth={1.3} />,
  <Sparkles key="sparkles" size={22} strokeWidth={1.3} />, <ChefHat key="chef" size={22} strokeWidth={1.3} />,
];

const labels = {
  en: [
    "King Size Bed", "Air Conditioning", "Separate Living Room", "High Speed WiFi",
    "43\" Smart TV", "Complimentary Breakfast", "Complimentary Drinks", "Complimentary Laundry (4 pcs)",
    "Mini Bar", "Tea & Coffee Maker", "Complimentary Water", "Room Safe",
    "Wardrobe", "Bathrobe", "Slippers", "Laundry Service",
    "24×7 Room Service", "Bathtub (Premium)", "TOTO Smart Toilet", "Japanese Cuisine",
  ],
  ja: [
    "キングサイズベッド", "エアコン", "独立リビング", "高速WiFi",
    "43型スマートTV", "朝食無料", "飲み物無料", "無料ランドリー（4点）",
    "ミニバー", "湯沸かし器・コーヒーメーカー", "無料ミネラルウォーター", "セーフティボックス",
    "ワードローブ", "バスローブ", "スリッパ", "ランドリーサービス",
    "24時間ルームサービス", "バスタブ（プレミアム）", "TOTOスマートトイレ", "日本料理",
  ],
};

export default function AmenitiesSection() {
  const { lang } = useLanguage();

  const T = {
    en: { label: "Room Amenities", h2: "Rich Amenities", subtitle: "Everything You Need, Nothing You Don't" },
    ja: { label: "客室設備", h2: "充実したアメニティ", subtitle: "必要なものすべて、無駄なものは何もない" },
  }[lang];

  return (
    <section className="bg-[#F7F8FA] py-28" id="amenities">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">{T.label}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            {T.h2}
          </motion.h2>
          <p className="text-[#6B7280] text-[13px] tracking-[0.1em] uppercase">{T.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {labels[lang].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
              whileHover={{ y: -4 }}
              className="group glass-card grad-border-hover flex flex-col items-center text-center p-4 rounded-2xl cursor-default transition-all duration-300 hover:bg-white/[0.06]"
            >
              <div className="grad-text mb-3 group-hover:scale-110 transition-transform duration-300">{icons[i]}</div>
              <p className="text-[#374151] text-[12px] leading-tight font-medium group-hover:text-[#1A1A2A] transition-colors">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
