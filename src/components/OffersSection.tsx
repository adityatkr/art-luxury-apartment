"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, Tag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BOOK_TODAY_IMAGES = [
  { src: "/images/bedroom.webp",     pos: "object-center" },
  { src: "/images/living-room.webp", pos: "object-center" },
  { src: "/images/bathroom.webp",    pos: "object-top" },
];

const VIEW_RATES_IMAGES = [
  { src: "/images/kitchen.webp",    pos: "object-center" },
  { src: "/images/art-wall.webp",   pos: "object-top" },
  { src: "/images/corridor.webp",   pos: "object-center" },
];

export default function OffersSection() {
  const { lang } = useLanguage();

  const T = {
    en: {
      label: "Special Offers", h2: "Special Offers", subtitle: "Great Value, Every Stay",
      card1Tag: "Plan Ahead", card1Title: "Early Bird", card1Sub: "Book 2 Days in Advance",
      card1Desc: "Secure the best rate by booking at least 2 days before your arrival. Enjoy a relaxed stay knowing your suite is confirmed.",
      card1Cta: "Book Early",
      card2Tag: "Same Day", card2Title: "Last Minute Deal", card2Sub: "Same-Day Bookings",
      card2Desc: "Need a suite today? Our last-minute deal offers spontaneous travelers premium comfort at special rates for same-day check-in.",
      card2Cta: "Book Today",
      card3Tag: "Always On", card3Title: "Basic Rate", card3Sub: "Best Available Rate",
      card3Desc: "Our standard Best Available Rate — always competitive, always transparent. No hidden charges, just honest pricing for premium stays.",
      card3Cta: "View Rates",
    },
    ja: {
      label: "スペシャルオファー", h2: "特別なご提案", subtitle: "いつでもお得なご滞在",
      card1Tag: "事前計画", card1Title: "アーリーバード", card1Sub: "2日前までのご予約",
      card1Desc: "到着の少なくとも2日前にご予約いただくと最安値をご提供します。スイートが確定した安心感でゆったりとご滞在ください。",
      card1Cta: "早めに予約",
      card2Tag: "当日", card2Title: "直前割引", card2Sub: "当日予約対応",
      card2Desc: "今日スイートが必要ですか？直前割引は、当日チェックインの旅行者にスペシャルレートでプレミアムな快適さを提供します。",
      card2Cta: "今日予約",
      card3Tag: "常時提供", card3Title: "ベーシックレート", card3Sub: "ベストアベイラブルレート",
      card3Desc: "いつも競争力があり、透明なスタンダードベストアベイラブルレート。隠れた料金なし、プレミアム滞在の正直な価格設定。",
      card3Cta: "料金を見る",
    },
  }[lang];

  return (
    <section className="bg-[#F7F8FA] py-28" id="offers">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl p-8 flex flex-col transition-all duration-300 text-white shadow-xl"
            style={{ background: "linear-gradient(135deg, #7357FF 0%, #C344D8 50%, #FF8A45 100%)" }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/15">
              <CalendarDays size={24} strokeWidth={1.5} className="text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2 text-white/70">{T.card1Tag}</span>
            <h3 className="text-[24px] font-bold text-white leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{T.card1Title}</h3>
            <p className="text-[13px] font-medium mb-4 text-white/80">{T.card1Sub}</p>
            <p className="text-[14px] leading-[1.75] flex-1 mb-8 text-white/70">{T.card1Desc}</p>
            <a href="#rooms" className="flex items-center gap-2 text-[13px] font-semibold hover:gap-3 transition-all duration-200 text-white">
              {T.card1Cta} <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl overflow-hidden flex flex-col bg-white border border-[#F3F4F6] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-[2px] h-[200px] flex-shrink-0">
              <div className="row-span-2 overflow-hidden">
                <img loading="lazy" src={BOOK_TODAY_IMAGES[0].src} alt="Suite bedroom" className={`w-full h-full object-cover ${BOOK_TODAY_IMAGES[0].pos} transition-transform duration-700 hover:scale-105`} />
              </div>
              <div className="overflow-hidden">
                <img loading="lazy" src={BOOK_TODAY_IMAGES[1].src} alt="Living room" className={`w-full h-full object-cover ${BOOK_TODAY_IMAGES[1].pos} transition-transform duration-700 hover:scale-105`} />
              </div>
              <div className="overflow-hidden">
                <img loading="lazy" src={BOOK_TODAY_IMAGES[2].src} alt="Bathroom" className={`w-full h-full object-cover ${BOOK_TODAY_IMAGES[2].pos} transition-transform duration-700 hover:scale-105`} />
              </div>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7357FF20, #FF8A4520)" }}>
                  <Clock size={20} strokeWidth={1.5} className="grad-text" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#6B7280]">{T.card2Tag}</span>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A2A] leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{T.card2Title}</h3>
              <p className="text-[13px] font-medium mb-3 grad-text">{T.card2Sub}</p>
              <p className="text-[14px] text-[#374151] leading-[1.75] flex-1 mb-6">{T.card2Desc}</p>
              <a href="#rooms" className="flex items-center gap-2 text-[13px] font-semibold hover:gap-3 transition-all duration-200 grad-text">
                {T.card2Cta} <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.24 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl overflow-hidden flex flex-col bg-white border border-[#F3F4F6] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-3 gap-[2px] h-[200px] flex-shrink-0">
              {VIEW_RATES_IMAGES.map((img, i) => (
                <div key={i} className="overflow-hidden">
                  <img loading="lazy" src={img.src} alt="" className={`w-full h-full object-cover ${img.pos} transition-transform duration-700 hover:scale-105`} />
                </div>
              ))}
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7357FF20, #FF8A4520)" }}>
                  <Tag size={20} strokeWidth={1.5} className="grad-text" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#6B7280]">{T.card3Tag}</span>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A2A] leading-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{T.card3Title}</h3>
              <p className="text-[13px] font-medium mb-3 grad-text">{T.card3Sub}</p>
              <p className="text-[14px] text-[#374151] leading-[1.75] flex-1 mb-6">{T.card3Desc}</p>
              <a href="#rooms" className="flex items-center gap-2 text-[13px] font-semibold hover:gap-3 transition-all duration-200 grad-text">
                {T.card3Cta} <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
