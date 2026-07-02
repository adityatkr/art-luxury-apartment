"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  const T = {
    en: {
      explore: "Explore",
      dining: "Dining",
      contact: "Contact",
      desc: "Premium Japanese-friendly apartment on Golf Course Road, Gurugram. Designed for long stays and corporate comfort.",
      navLinks: [
        { label: "Rooms", href: "#rooms" },
        { label: "Restaurants", href: "#restaurants" },
        { label: "Offers", href: "#offers" },
        { label: "Gallery", href: "#gallery" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      restaurants: [
        { name: "Arata", sub: "Japanese Fusion · Fine Dining", time: "6:00 AM – 10:30 PM" },
        { name: "Kaffee Stories", sub: "Rooftop Café · Soft Bar", time: "8:00 AM – 10:30 PM" },
      ],
      rights: "All rights reserved.",
      policy: ["Privacy Policy", "Terms & Conditions", "Cancellation Policy"],
    },
    ja: {
      explore: "探索",
      dining: "お食事",
      contact: "お問い合わせ",
      desc: "グルグラムのゴルフコースロードにある日本人フレンドリーなプレミアムアパートメント。長期滞在と法人向けに設計。",
      navLinks: [
        { label: "客室", href: "#rooms" },
        { label: "レストラン", href: "#restaurants" },
        { label: "特典", href: "#offers" },
        { label: "ギャラリー", href: "#gallery" },
        { label: "会社概要", href: "#about" },
        { label: "お問い合わせ", href: "#contact" },
      ],
      restaurants: [
        { name: "荒田 (Arata)", sub: "日本フュージョン · ファインダイニング", time: "午前6時 – 午後10時30分" },
        { name: "カフェ・ストーリーズ", sub: "ルーフトップカフェ · ソフトバー", time: "午前8時 – 午後10時30分" },
      ],
      rights: "全著作権所有。",
      policy: ["プライバシーポリシー", "利用規約", "キャンセルポリシー"],
    },
  }[lang];

  return (
    <footer className="bg-[#0A0A14] text-white">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-5">
              <p className="text-[18px] font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Art: Luxury Serviced Apartment</p>
            </div>
            <p className="text-[13px] text-white/45 leading-[1.8] mb-6">{T.desc}</p>
            <div className="flex gap-2.5">
              {["IG", "FB", "LI"].map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[11px] font-semibold text-white/70 hover:text-white hover:border-white/40 transition-all duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 grad-text">{T.explore}</p>
            <ul className="flex flex-col gap-3">
              {T.navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-white/45 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 grad-text">{T.dining}</p>
            <div className="flex flex-col gap-5">
              {T.restaurants.map((r) => (
                <div key={r.name}>
                  <p className="text-[13px] font-semibold text-white mb-1">{r.name}</p>
                  <p className="text-[12px] text-white/35">{r.sub}</p>
                  <p className="text-[12px] text-white/35 flex items-center gap-1.5 mt-1"><Clock size={11} strokeWidth={1.5} /> {r.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 grad-text">{T.contact}</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="grad-text mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[13px] text-white/45 leading-relaxed">517, Sector 27, Golf Course Road<br />Gurugram, Haryana 122002</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="grad-text flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+917428095672" className="text-[13px] text-white/45 hover:text-white transition-colors">+91 74280 95672</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="grad-text flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:reservation@limetreehotels.com" className="text-[13px] text-white/45 hover:text-white transition-colors break-all">reservation@limetreehotels.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">&copy; {new Date().getFullYear()} Art: Luxury Serviced Apartment. {T.rights}</p>
          <div className="flex items-center gap-6">
            {T.policy.map((link) => (
              <a key={link} href="#" className="text-[11px] text-white/25 hover:text-white/60 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
