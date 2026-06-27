"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = {
  en: [
    { name: "Tanaka Hiroshi", role: "Japanese Business Traveler", rating: 5, text: "Art: Luxury Serviced Apartment is one of the few places in Gurugram where I feel truly comfortable. The Japanese-friendly service, the Arata restaurant, and the spacious 1 BHK suite made my 3-month corporate stay feel like home.", stay: "3-Month Corporate Stay" },
    { name: "Priya Mehta", role: "Corporate Professional, Delhi NCR", rating: 5, text: "The separate living room and fully equipped kitchen make such a difference for long stays. I could actually cook my own meals and have space to work. The Golf Course Road location is unbeatable for business meetings.", stay: "6-Week Stay" },
    { name: "Michael Chen", role: "Expat Executive", rating: 5, text: "After trying several serviced apartments in Gurugram, Art: Luxury Serviced Apartment stands out for its genuine hospitality and attention to detail. The Kaffee Stories rooftop café is where I start every morning.", stay: "Ongoing Long Stay" },
  ],
  ja: [
    { name: "田中 博", role: "日本人ビジネス旅行者", rating: 5, text: "アート・ラグジュアリー・サービスアパートメントは、グルグラムで心から快適に過ごせる数少ない場所の一つです。日本人フレンドリーなサービス、荒田レストラン、そして広々とした1BHKスイートのおかげで、3か月の法人滞在が自宅のように感じられました。", stay: "3か月の法人滞在" },
    { name: "プリヤ・メータ", role: "法人プロフェッショナル、デリーNCR", rating: 5, text: "独立したリビングルームと完全装備のキッチンは、長期滞在において大きな違いをもたらします。自炊もでき、仕事スペースも確保できました。ゴルフコースロードのロケーションはビジネス会議に最適です。", stay: "6週間滞在" },
    { name: "マイケル・チェン", role: "駐在エグゼクティブ", rating: 5, text: "グルグラムのいくつかのサービスアパートメントを試した後、アート・ラグジュアリーが本物のホスピタリティと細部へのこだわりで際立っています。カフェ・ストーリーズのルーフトップカフェは毎朝の定番です。", stay: "長期滞在中" },
  ],
};

export default function TestimonialsSection() {
  const { lang } = useLanguage();

  const T = {
    en: { label: "Guest Stories", h2: "Guest Reviews", subtitle: "What Our Guests Say" },
    ja: { label: "ゲストストーリー", h2: "お客様の声", subtitle: "ご宿泊者様のご感想" },
  }[lang];

  return (
    <section className="bg-white py-28" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">{T.label}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            {T.h2}
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">{T.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials[lang].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass-card grad-border-hover rounded-3xl p-7 flex flex-col transition-all duration-300"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} size={13} fill="#7357FF" className="text-[#7357FF]" />
                ))}
              </div>
              <Quote size={20} className="text-[#E5E7EB] mb-3" />
              <p className="text-[14px] text-[#6B7280] leading-[1.8] flex-1 mb-6 italic">{t.text}</p>
              <div className="pt-5 border-t border-[#F3F4F6]">
                <p className="text-[14px] font-semibold text-[#1A1A2A]">{t.name}</p>
                <p className="text-[12px] text-[#9CA3AF]">{t.role}</p>
                <span className="mt-2 inline-block text-[10px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(115,87,255,0.15)", color: "#9B7DFF" }}>{t.stay}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
