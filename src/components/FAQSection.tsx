"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = {
  en: [
    { q: "What makes Art: Luxury Serviced Apartment a Japanese-friendly apartment?", a: "Our staff is trained to understand Japanese customs and provide attentive, Japanese-style hospitality. We have in-house Japanese cuisine at Arata restaurant, Japanese-speaking staff assistance, and accommodation designed for the comfort and preferences of Japanese guests." },
    { q: "What is included in the Sora Suite 1 BHK?", a: "Each Sora Suite includes a king-size bed, fully separate living room, fully equipped kitchen, 43-inch Smart TV, mini bar, tea & coffee maker, complimentary bottled water, bathrobe & slippers, in-room safe, wardrobe, free WiFi, air conditioning, and 24-hour room service." },
    { q: "What is the difference between the two room types?", a: "The Sora Suites 1 BHK with Bathtub includes a luxury soaking bathtub in addition to all standard amenities. Pricing starts at ₹6,000 (single, room only) compared to ₹5,000 for the standard suite. Both are 300 sq ft 1 BHK suites." },
    { q: "How far in advance must I book and what deposit is required?", a: "You can book any time — we offer both early bird (2 days in advance) and same-day bookings. A 25% advance payment is required to confirm all reservations. Payment is processed via CC Avenue." },
    { q: "What is the cancellation policy?", a: "Cancellations made 24 hours or more before arrival receive a full refund. Cancellations made within 24 hours of arrival will be charged the full amount. We recommend booking with appropriate lead time to avoid any cancellation charges." },
    { q: "Are meals included in the room rate?", a: "Room-only rates are available for both room types. Breakfast add-on is available for ₹1,000 additional per person. Our in-house restaurants Arata and Kaffee Stories are available for dining." },
    { q: "Is the apartment suitable for long corporate stays?", a: "Absolutely — Art: Luxury Serviced Apartment is specifically designed for long-stay corporate travelers and expat professionals. The 1 BHK layout with kitchen, living room, and workspace makes extended stays genuinely comfortable. Special long-stay packages are available on request." },
    { q: "How do I reach the apartment from the airport or metro?", a: "The apartment is located on Golf Course Road, Sector 27, Gurugram. The nearest metro station is DLF Phase 1 on the Rapid Metro line (~5 minutes away). From IGI Airport, the apartment is approximately 30-40 minutes by road via NH-48." },
  ],
  ja: [
    { q: "アート・ラグジュアリー・サービスアパートメントが日本人フレンドリーな理由は？", a: "スタッフは日本の風習を理解し、日本式のおもてなしを提供するよう訓練されています。館内には日本料理レストラン「荒田（Arata）」があり、日本語対応スタッフのサポートも可能です。" },
    { q: "ソラスイート1BHKには何が含まれていますか？", a: "各ソラスイートには、キングサイズベッド、独立したリビングルーム、完全装備のキッチン、43型スマートTV、ミニバー、湯沸かし器・コーヒーメーカー、ミネラルウォーター、バスローブ・スリッパ、セーフティボックス、ワードローブ、無料WiFi、エアコン、24時間ルームサービスが含まれます。" },
    { q: "2種類の客室の違いは何ですか？", a: "バスタブ付きのソラスイート1BHKは、標準アメニティに加えて高級浸かり湯バスタブが付いています。料金はシングル・室料のみで₹6,000から（標準スイートは₹5,000から）。両方とも28㎡の1BHKスイートです。" },
    { q: "何日前までに予約が必要ですか？デポジットはいくらですか？", a: "いつでもご予約いただけます。アーリーバード（2日前）も当日予約も承ります。すべての予約に25%の前払いが必要で、CCアベニューで決済されます。" },
    { q: "キャンセルポリシーはどうなっていますか？", a: "到着の24時間以上前のキャンセルは全額返金されます。到着の24時間以内のキャンセルは全額請求されます。キャンセル料を避けるため、余裕をもってご予約ください。" },
    { q: "食事は料金に含まれていますか？", a: "両客室タイプとも室料のみのプランがあります。朝食付きプランは1名様あたり₹1,000の追加料金です。館内レストランの荒田とカフェ・ストーリーズもご利用いただけます。" },
    { q: "長期法人滞在に適していますか？", a: "もちろんです。アート・ラグジュアリー・サービスアパートメントは長期滞在の法人旅行者や駐在プロフェッショナルのために設計されています。キッチン、リビング、ワークスペースを備えた1BHKレイアウトで長期滞在が快適に。長期割引パッケージもご相談ください。" },
    { q: "空港やメトロからのアクセスは？", a: "アパートメントはグルグラムのゴルフコースロード、セクター27にあります。最寄り駅はラピッドメトロ線のDLFフェーズ1（約5分）。IGI空港からはNH-48経由で約30〜40分です。" },
  ],
};

function FAQItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#E5E7EB] last:border-none">
      <button className="w-full flex items-center justify-between gap-4 py-5 text-left group" onClick={onToggle}>
        <span className={`text-[15px] font-medium transition-colors ${isOpen ? "text-[#7357FF]" : "text-[#374151] group-hover:text-[#1A1A2A]"}`}>{faq.q}</span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-[#7357FF] text-[#7357FF]" : "border-[#E5E7EB] text-[#9CA3AF]"}`}>
          {isOpen ? <Minus size={12} strokeWidth={2} /> : <Plus size={12} strokeWidth={2} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <p className="text-[14px] text-[#6B7280] leading-[1.8] pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLanguage();

  const T = {
    en: { label: "FAQ", h2: "Frequently Asked Questions", subtitle: "Common Questions", body: "Everything you need to know about staying at Art: Luxury Serviced Apartment.", cta: "Still have questions?" },
    ja: { label: "よくある質問", h2: "よくある質問", subtitle: "よくあるご質問", body: "アート・ラグジュアリー・サービスアパートメントのご滞在についてのよくある質問です。", cta: "他にご質問はありますか？" },
  }[lang];

  return (
    <section className="bg-[#F7F8FA] py-28" id="faq">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">{T.label}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
              style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
              {T.h2}
            </motion.h2>
            <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase mb-6">{T.subtitle}</p>
            <p className="text-[15px] text-[#6B7280] leading-[1.75] mb-8">{T.body}</p>
            <a href="mailto:reservation@limetreehotels.com"
              className="btn-rainbow inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-3 rounded-full">
              <span>{T.cta}</span>
            </a>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
            {faqs[lang].map((faq, i) => (
              <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
