"use client";

import { motion } from "framer-motion";
import { MapPin, Train, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const attractionIcons = [
  <MapPin key="1" size={18} strokeWidth={1.5} />,
  <Train key="2" size={18} strokeWidth={1.5} />,
  <MapPin key="3" size={18} strokeWidth={1.5} />,
  <ShoppingBag key="4" size={18} strokeWidth={1.5} />,
  <ShoppingBag key="5" size={18} strokeWidth={1.5} />,
];

const attractions = {
  en: [
    { name: "Golf Course Road", desc: "Prime commercial and residential corridor — at your doorstep", distance: "On-site" },
    { name: "DLF Phase 1 Rapid Metro", desc: "Quick metro connectivity to Gurugram's business hubs", distance: "5 min" },
    { name: "CyberHub", desc: "Gurugram's iconic dining and entertainment district", distance: "10 min" },
    { name: "Global Foyer Mall", desc: "Premium retail, dining, and entertainment complex", distance: "8 min" },
    { name: "South Point Mall", desc: "Everyday shopping and dining convenience nearby", distance: "10 min" },
  ],
  ja: [
    { name: "ゴルフコースロード", desc: "一流の商業・住宅街 — 玄関先に", distance: "現地" },
    { name: "DLFフェーズ1 ラピッドメトロ", desc: "グルグラムのビジネス街へ素早くアクセス", distance: "5分" },
    { name: "サイバーハブ", desc: "グルグラムを代表するダイニング・エンタメゾーン", distance: "10分" },
    { name: "グローバルフォイヤーモール", desc: "プレミアムショッピング、飲食、エンタメ複合施設", distance: "8分" },
    { name: "サウスポイントモール", desc: "日常のショッピングと食事に便利", distance: "10分" },
  ],
};

export default function NearbySection() {
  const { lang } = useLanguage();

  const T = {
    en: { label: "Location", h2: "Golf Course Road", subtitle: "At the Heart of Golf Course Road", body: "517, Sector 27 places you on one of Gurugram's most prestigious addresses — surrounded by top businesses, world-class malls, and excellent metro connectivity." },
    ja: { label: "ロケーション", h2: "ゴルフコースロード", subtitle: "ゴルフコースロードの中心に", body: "セクター27・517番地は、グルグラム随一の一等地。一流ビジネス街、世界クラスのモール、優れたメトロアクセスに囲まれています。" },
  }[lang];

  return (
    <section className="bg-white py-28" id="location">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">{T.label}</p>
            <h2 className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
              style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
              {T.h2}
            </h2>
            <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase mb-6">{T.subtitle}</p>
            <p className="text-[15px] text-[#6B7280] leading-[1.8] mb-10">{T.body}</p>

            <div className="flex flex-col gap-4">
              {attractions[lang].map((a, i) => (
                <motion.div key={a.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card grad-border-hover flex items-start gap-4 rounded-2xl p-4 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 grad-text" style={{ background: "rgba(115, 87, 255, 0.1)" }}>
                    {attractionIcons[i]}
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
                  <p className="text-[13px] font-semibold text-white mb-1">Art: Luxury Serviced Apartment</p>
                  <p className="text-[12px] text-white/50 leading-relaxed">517, Sector 27, Golf Course Road, Gurugram, Haryana</p>
                  <a href="tel:+917428095672" className="text-[12px] grad-text mt-2 block hover:opacity-80">+91 74280 95672</a>
                  <a href="mailto:reservation@limetreehotels.com" className="text-[12px] grad-text block hover:opacity-80">reservation@limetreehotels.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.15 }} className="sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: "460px" }}>
              <iframe
                src="https://maps.google.com/maps?q=28.463133,77.090741&z=16&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <a href="https://maps.app.goo.gl/C7axyqx7aq4ksAux5" target="_blank" rel="noopener noreferrer"
                className="btn-rainbow text-[12px] font-semibold px-5 py-2.5 rounded-full whitespace-nowrap">
                <span>Open in Google Maps</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
