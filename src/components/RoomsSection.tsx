"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, BedDouble, Users, ArrowRight, X, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const rooms = [
  {
    id: "sora-1bhk",
    imageSrc: "/images/bedroom.webp",
    imageAlt: "Sora Suites 1 BHK",
    name: "Sora Suites 1 BHK",
    occupancy: "2 Adults",
    beds: "King Size Bed",
    count: 16,
    features: {
      en: [
        "Separate Living Room", "Fully Equipped Kitchen", "Complimentary Breakfast",
        "Complimentary Drinks", "Complimentary Laundry (4 pcs)", "Free High-Speed WiFi",
        "43-inch Smart TV", "Mini Bar", "Tea & Coffee Maker",
        "In-room Safe", "Wardrobe", "24-Hour Room Service",
      ],
      ja: [
        "独立リビングルーム", "完全装備キッチン", "朝食無料",
        "飲み物無料", "無料ランドリー（4点）", "高速WiFi無料",
        "43型スマートTV", "ミニバー", "湯沸かし器・コーヒーメーカー",
        "セーフティボックス", "ワードローブ", "24時間ルームサービス",
      ],
    },
    pricing: {
      roomOnly: { single: 5000, double: 6000 },
      breakfast: { single: 6000, double: 7000 },
    },
  },
  {
    id: "sora-bathtub",
    imageSrc: "/images/bathroom.webp",
    imageAlt: "Sora Suites 1 BHK with Bathtub",
    name: "Sora Suites 1 BHK",
    badge: { en: "with Bathtub", ja: "バスタブ付き" },
    occupancy: "2 Adults",
    beds: "King Size Bed",
    count: 16,
    features: {
      en: [
        "Separate Living Room", "Fully Equipped Kitchen", "Luxury Bathtub",
        "Complimentary Breakfast", "Complimentary Drinks", "Complimentary Laundry (4 pcs)",
        "Free High-Speed WiFi", "43-inch Smart TV", "Mini Bar",
        "Tea & Coffee Maker", "In-room Safe", "24-Hour Room Service",
      ],
      ja: [
        "独立リビングルーム", "完全装備キッチン", "高級バスタブ",
        "朝食無料", "飲み物無料", "無料ランドリー（4点）",
        "高速WiFi無料", "43型スマートTV", "ミニバー",
        "湯沸かし器・コーヒーメーカー", "セーフティボックス", "24時間ルームサービス",
      ],
    },
    pricing: {
      roomOnly: { single: 6000, double: 7000 },
      breakfast: { single: 7000, double: 7500 },
    },
  },
];

type Room = typeof rooms[0];
type Lang = "en" | "ja";

type BookingForm = {
  name: string; email: string; phone: string;
  checkIn: string; checkOut: string; adults: string;
  children: string; mealPlan: string; specialReq: string;
};

function BookingModal({ room, onClose, lang }: { room: Room; onClose: () => void; lang: Lang }) {
  const TM = {
    en: {
      subtitle: "Complete your booking request",
      name: "Full Name", namePh: "Your name",
      email: "Email", emailPh: "your@email.com",
      phone: "Phone", phonePh: "+91 XXXXX XXXXX",
      checkIn: "Check-in", checkOut: "Check-out",
      adults: "Adults", children: "Children", mealPlan: "Meal Plan",
      roomOnly: "Room Only", breakfast: "+ Breakfast",
      specialReq: "Special Requests", specialPh: "Any special requirements...",
      estTotal: "Est. Total (incl. 5% GST)", advance: "Advance",
      nights: "night", nightsP: "nights",
      submit: "Submit Booking Request", submitting: "Submitting…",
      note: "25% advance required to confirm. Our team will contact you within 2 hours.",
      successTitle: "Booking Submitted!",
      successBody: "We'll confirm within 2 hours and reach you at your email and phone.",
      bookingId: "Booking ID", totalNights: "Nights",
      totalLabel: "Total (incl. 5% GST)", advanceLabel: "Advance (25%)",
      done: "Done",
    },
    ja: {
      subtitle: "予約リクエストをご入力ください",
      name: "お名前", namePh: "お名前",
      email: "メールアドレス", emailPh: "メールアドレス",
      phone: "電話番号", phonePh: "+91 XXXXX XXXXX",
      checkIn: "チェックイン", checkOut: "チェックアウト",
      adults: "大人", children: "子供", mealPlan: "食事プラン",
      roomOnly: "室料のみ", breakfast: "朝食付き",
      specialReq: "特別なリクエスト", specialPh: "ご要望をご記入ください...",
      estTotal: "合計見積もり（GST 5%込み）", advance: "前払い",
      nights: "泊", nightsP: "泊",
      submit: "予約リクエストを送信", submitting: "送信中…",
      note: "25%前払いで確定。2時間以内にご連絡いたします。",
      successTitle: "予約を受け付けました！",
      successBody: "2時間以内にメール・電話にてご確認のご連絡をいたします。",
      bookingId: "予約ID", totalNights: "泊数",
      totalLabel: "合計（GST 5%込み）", advanceLabel: "前払い（25%）",
      done: "完了",
    },
  }[lang];

  const badgeLabel = room.badge ? room.badge[lang] : undefined;

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [form, setForm] = useState<BookingForm>({
    name: "", email: "", phone: "",
    checkIn: today, checkOut: tomorrow,
    adults: "2", children: "0",
    mealPlan: "room-only", specialReq: "",
  });
  const [step, setStep] = useState<"form" | "success">("form");
  const [result, setResult] = useState<{ bookingId: string; totalAmount: number; advancePaid: number; totalNights: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000))
    : 0;
  const rateKey = form.mealPlan === "breakfast" ? "breakfast" : "roomOnly";
  const baseRate = Number(form.adults) === 1 ? room.pricing[rateKey].single : room.pricing[rateKey].double;
  const estimatedTotal = Math.round(baseRate * Math.max(nights, 1) * 1.05);
  const advanceEst = Math.round(estimatedTotal * 0.25);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          roomType: badgeLabel ? `${room.name} ${badgeLabel}` : room.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      setResult(data);
      setStep("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isValid = form.name && form.email && form.phone && nights >= 1;
  const inputCls = "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#7357FF]/60 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0F0F1A] border border-white/[0.08] rounded-3xl max-w-[520px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/[0.07]">
          <div>
            <h3 className="text-[17px] font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {room.name}{badgeLabel && <> <span className="grad-text">{badgeLabel}</span></>}
            </h3>
            <p className="text-[12px] text-white/70 mt-0.5">{TM.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {step === "success" && result ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }}>
              <Check size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <h4 className="text-[20px] font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {TM.successTitle}
            </h4>
            <p className="text-white/80 text-[13px] mb-6">{TM.successBody}</p>
            <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-5 text-left mb-6">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div><p className="text-white/70 text-[10px] uppercase tracking-wider mb-1">{TM.bookingId}</p><p className="text-white font-mono font-bold">#{result.bookingId.slice(-6).toUpperCase()}</p></div>
                <div><p className="text-white/70 text-[10px] uppercase tracking-wider mb-1">{TM.totalNights}</p><p className="text-white font-bold">{result.totalNights}</p></div>
                <div><p className="text-white/70 text-[10px] uppercase tracking-wider mb-1">{TM.totalLabel}</p><p className="text-white font-bold">₹{result.totalAmount.toLocaleString("en-IN")}</p></div>
                <div><p className="text-white/70 text-[10px] uppercase tracking-wider mb-1">{TM.advanceLabel}</p><p className="font-bold grad-text">₹{result.advancePaid.toLocaleString("en-IN")}</p></div>
              </div>
            </div>
            <button onClick={onClose} className="btn-rainbow text-[14px] font-semibold px-8 py-3 rounded-xl w-full">
              <span>{TM.done}</span>
            </button>
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.name}</label>
                <input type="text" required placeholder={TM.namePh} value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.email}</label>
                <input type="email" required placeholder={TM.emailPh} value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.phone}</label>
                <input type="tel" required placeholder={TM.phonePh} value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.checkIn}</label>
                <input type="date" min={today} value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  className={`${inputCls} [color-scheme:dark]`} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.checkOut}</label>
                <input type="date" min={form.checkIn} value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  className={`${inputCls} [color-scheme:dark]`} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "adults", label: TM.adults, opts: [1, 2, 3] },
                { key: "children", label: TM.children, opts: [0, 1, 2] },
              ].map(({ key, label, opts }) => (
                <div key={key}>
                  <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{label}</label>
                  <select value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className={inputCls}>
                    {opts.map((n) => <option key={n} value={n} className="bg-[#0F0F1A]">{n}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.mealPlan}</label>
                <select value={form.mealPlan} onChange={(e) => setForm({ ...form, mealPlan: e.target.value })} className={inputCls}>
                  <option value="room-only" className="bg-[#0F0F1A]">{TM.roomOnly}</option>
                  <option value="breakfast" className="bg-[#0F0F1A]">{TM.breakfast}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/70 uppercase tracking-widest block mb-1.5">{TM.specialReq}</label>
              <textarea rows={2} placeholder={TM.specialPh} value={form.specialReq}
                onChange={(e) => setForm({ ...form, specialReq: e.target.value })}
                className={`${inputCls} resize-none`} />
            </div>

            {nights > 0 && (
              <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider">{TM.estTotal}</p>
                  <p className="text-[20px] font-bold text-white">₹{estimatedTotal.toLocaleString("en-IN")}</p>
                  <p className="text-[11px] text-white/70">{nights} {nights > 1 ? TM.nightsP : TM.nights} · {TM.advance}: <span className="grad-text font-semibold">₹{advanceEst.toLocaleString("en-IN")}</span></p>
                </div>
              </div>
            )}

            {error && <p className="text-red-400 text-[13px]">{error}</p>}

            <button onClick={handleSubmit} disabled={loading || !isValid}
              className="btn-rainbow text-[14px] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              <span>{loading ? TM.submitting : TM.submit}</span>
            </button>
            <p className="text-[11px] text-white/60 text-center">{TM.note}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function RoomsSection() {
  const [activeModal, setActiveModal] = useState<Room | null>(null);
  const { lang } = useLanguage();

  const T = {
    en: {
      label: "Our Rooms", h2: "Our Suite Rooms", subtitle: "Spacious Suites Crafted for Comfortable Long Stays",
      available: "rooms available", bookBtn: "Book This Room",
      tariffLabel: "Room Tariff", single: "Single", double: "Double",
      roomOnly: "Room Only", breakfast: "+ Breakfast",
      gstNote: "+5% GST · +₹1,000/extra adult",
      cancelLabel: "Cancellation Policy", cancelVal: "24h+ notice → Full Refund · Within 24h → Full Charge",
      bookingLabel: "Booking Info", bookingVal: "25% advance via CC Avenue · ",
    },
    ja: {
      label: "客室", h2: "特別なスイートルーム", subtitle: "長期快適滞在のために設計されたスイート",
      available: "室", bookBtn: "この部屋を予約",
      tariffLabel: "客室料金", single: "シングル", double: "ダブル",
      roomOnly: "室料のみ", breakfast: "朝食付き",
      gstNote: "+GST 5% · 追加大人 +₹1,000",
      cancelLabel: "キャンセルポリシー", cancelVal: "24時間以上前 → 全額返金 · 24時間以内 → 全額請求",
      bookingLabel: "予約情報", bookingVal: "CCアベニューで25%前払い · ",
    },
  }[lang];

  return (
    <section className="bg-white py-28" id="rooms">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rooms.map((room, i) => {
            const badgeLabel = room.badge ? room.badge[lang] : undefined;
            return (
              <motion.div key={room.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.15 }}
                className="glass-card grad-border-hover rounded-3xl overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={room.imageSrc} alt={room.imageAlt} loading="lazy" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/80 to-transparent" />
                  {badgeLabel && (
                    <span className="absolute top-4 right-4 text-[11px] font-semibold px-3 py-1.5 rounded-full text-white"
                      style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }}>{badgeLabel}</span>
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {[{ icon: <BedDouble size={10} />, label: room.beds }, { icon: <Users size={10} />, label: room.occupancy }].map((tag) => (
                      <span key={tag.label} className="bg-white/10 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">{tag.icon} {tag.label}</span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-[20px] font-bold text-[#1A1A2A] leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      {room.name}{badgeLabel && <> <span className="grad-text">{badgeLabel}</span></>}
                    </h3>
                    <p className="text-[12px] text-[#6B7280] mt-1">{room.count} {T.available}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
                    {room.features[lang].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-[12px] text-[#374151]">
                        <Check size={10} strokeWidth={2.5} style={{ color: "#7357FF" }} className="flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>

                  <div className="glass-card rounded-xl p-4 mb-5">
                    <p className="section-label text-[10px] mb-3">{T.tariffLabel}</p>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-[#6B7280] mb-1 uppercase tracking-wider"><span /><span className="text-center">{T.single}</span><span className="text-center">{T.double}</span></div>
                    {[{ label: T.roomOnly, key: "roomOnly" as const }, { label: T.breakfast, key: "breakfast" as const }].map(({ label, key }) => (
                      <div key={key} className="grid grid-cols-3 gap-2 py-2 border-t border-[#F3F4F6] text-[12px]">
                        <span className="text-[#374151]">{label}</span>
                        <span className="text-[#1A1A2A] font-semibold text-center">₹{room.pricing[key].single.toLocaleString()}</span>
                        <span className="text-[#1A1A2A] font-semibold text-center">₹{room.pricing[key].double.toLocaleString()}</span>
                      </div>
                    ))}
                    <p className="text-[10px] text-[#6B7280] mt-2">{T.gstNote}</p>
                  </div>

                  <button onClick={() => setActiveModal(room)}
                    className="btn-rainbow mt-auto text-[13px] font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
                    <span>{T.bookBtn}</span> <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 glass-card rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <p className="section-label text-[10px] mb-2">{T.cancelLabel}</p>
            <p className="text-[13px] text-[#374151]">{T.cancelVal}</p>
          </div>
          <div className="flex-1">
            <p className="section-label text-[10px] mb-2">{T.bookingLabel}</p>
            <p className="text-[13px] text-[#374151]">{T.bookingVal}<a href="mailto:reservation@limetreehotels.com" className="grad-text">reservation@limetreehotels.com</a></p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeModal && <BookingModal room={activeModal} onClose={() => setActiveModal(null)} lang={lang} />}
      </AnimatePresence>
    </section>
  );
}
