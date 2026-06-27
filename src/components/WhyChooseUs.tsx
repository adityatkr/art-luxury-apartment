"use client";

import { motion } from "framer-motion";
import {
  Star, Wifi, Coffee, ShieldCheck, MapPin, UtensilsCrossed,
  BedDouble, Home, Clock, Gem, UserCheck, Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [
  <Star key="star" size={22} strokeWidth={1.3} />,
  <Gem key="gem" size={22} strokeWidth={1.3} />,
  <Home key="home" size={22} strokeWidth={1.3} />,
  <Coffee key="coffee" size={22} strokeWidth={1.3} />,
  <MapPin key="pin" size={22} strokeWidth={1.3} />,
  <UtensilsCrossed key="utensils" size={22} strokeWidth={1.3} />,
  <Clock key="clock" size={22} strokeWidth={1.3} />,
  <UserCheck key="user" size={22} strokeWidth={1.3} />,
  <ShieldCheck key="shield" size={22} strokeWidth={1.3} />,
  <BedDouble key="bed" size={22} strokeWidth={1.3} />,
  <Zap key="zap" size={22} strokeWidth={1.3} />,
  <Wifi key="wifi" size={22} strokeWidth={1.3} />,
];

const features = {
  en: [
    { title: "Japanese Friendly", desc: "Staff trained in Japanese hospitality with dedicated support for Japanese guests and executives." },
    { title: "Spacious 1 BHK Suites", desc: "300 sq ft suites with a separate bedroom, living area, and fully equipped kitchen." },
    { title: "Separate Living Room", desc: "A proper living space to work, relax, or entertain — not just a room with a chair." },
    { title: "Fully Equipped Kitchen", desc: "Cook your own meals. Hob, microwave, utensils, and refrigerator included." },
    { title: "Golf Course Road", desc: "Prime location on Gurugram's most prestigious business corridor — near DLF, Cyber City, and MNC offices." },
    { title: "Japanese Restaurant", desc: "Arata serves authentic Japanese fusion cuisine in a fine-dining setting. Open 6 AM to 10:30 PM." },
    { title: "Long Stay Friendly", desc: "Special packages for weekly, monthly, and quarterly stays. Your home away from home." },
    { title: "Corporate Friendly", desc: "Invoice billing, corporate rates, and seamless check-in for business travelers." },
    { title: "Hygienic Stay", desc: "Hospital-grade housekeeping, UV sanitation, and daily linen change included." },
    { title: "24×7 Room Service", desc: "Round-the-clock room service from our in-house kitchen, available every day of the year." },
    { title: "Express Check-in", desc: "Digital check-in available. Your suite is ready before you arrive." },
    { title: "Premium Amenities", desc: "43-inch Smart TV, high-speed WiFi, mini bar, in-room safe, and luxury toiletries." },
  ],
  ja: [
    { title: "日本人フレンドリー", desc: "日本のおもてなしを心得たスタッフが、日本人ゲストやエグゼクティブのために専任サポートを提供します。" },
    { title: "広々1BHKスイート", desc: "独立した寝室、リビングエリア、完全装備のキッチンを備えた28㎡のスイートです。" },
    { title: "独立リビングルーム", desc: "仕事も、くつろぎも、接待にも使える本格的なリビングスペースです。" },
    { title: "完全装備キッチン", desc: "コンロ、電子レンジ、調理器具、冷蔵庫完備。自炊も自由にできます。" },
    { title: "ゴルフコースロード", desc: "DLF、サイバーシティ、多国籍企業オフィスに近い、グルグラム有数のビジネス街に位置します。" },
    { title: "日本料理レストラン", desc: "荒田（Arata）では本格的な日本料理をファインダイニングスタイルでご提供。営業時間は午前6時〜午後10時半。" },
    { title: "長期滞在対応", desc: "週単位・月単位・四半期単位の特別パッケージ。第二の家としてご利用ください。" },
    { title: "法人向け", desc: "請求書払い、法人料金、スムーズなチェックインでビジネス旅行者をサポートします。" },
    { title: "清潔な滞在", desc: "病院レベルのハウスキーピング、UV除菌、毎日のリネン交換付き。" },
    { title: "24時間ルームサービス", desc: "年中無休・24時間、館内キッチンからのルームサービスが利用できます。" },
    { title: "スピードチェックイン", desc: "デジタルチェックイン対応。ご到着前にスイートルームをご準備します。" },
    { title: "プレミアムアメニティ", desc: "43型スマートTV、高速WiFi、ミニバー、セーフティボックス、高級アメニティ完備。" },
  ],
};

export default function WhyChooseUs() {
  const { lang } = useLanguage();

  const T = {
    en: { label: "Why Choose Us", h2: "Why Art?", subtitle: "Designed for Guests Who Demand More" },
    ja: { label: "選択の理由", h2: "選ばれる理由", subtitle: "求める方々のために設計" },
  }[lang];

  return (
    <section className="bg-[#F7F8FA] py-28" id="why">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            {T.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}
          >
            {T.h2}
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">{T.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {features[lang].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="group glass-card grad-border-hover rounded-2xl p-5 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 text-white/60 group-hover:text-white"
                style={{ background: "rgba(115, 87, 255, 0.1)" }}
              >
                <div className="group-hover:grad-text transition-all" style={{ color: "inherit" }}>
                  {icons[i]}
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-[#1A1A2A] mb-2 leading-tight">{f.title}</h3>
              <p className="text-[12px] text-[#6B7280] leading-[1.75]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
