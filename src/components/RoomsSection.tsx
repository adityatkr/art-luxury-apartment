"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, BedDouble, Ruler, Users, ArrowRight, X, Loader2 } from "lucide-react";

const rooms = [
  {
    id: "sora-1bhk",
    imageSrc: "/images/bedroom.webp",
    imageAlt: "Sora Suites 1 BHK",
    name: "Sora Suites 1 BHK",
    area: "300 sq ft",
    occupancy: "2 Adults",
    beds: "King Size Bed",
    count: 16,
    features: [
      "Separate Living Room", "Fully Equipped Kitchen", "Complimentary Breakfast",
      "Complimentary Drinks", "Complimentary Laundry (4 pcs)", "Free High-Speed WiFi",
      "43-inch Smart TV", "Mini Bar", "Tea & Coffee Maker",
      "In-room Safe", "Wardrobe", "24-Hour Room Service",
    ],
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
    badge: "with Bathtub",
    area: "300 sq ft",
    occupancy: "2 Adults",
    beds: "King Size Bed",
    count: 16,
    features: [
      "Separate Living Room", "Fully Equipped Kitchen", "Luxury Bathtub",
      "Complimentary Breakfast", "Complimentary Drinks", "Complimentary Laundry (4 pcs)",
      "Free High-Speed WiFi", "43-inch Smart TV", "Mini Bar",
      "Tea & Coffee Maker", "In-room Safe", "24-Hour Room Service",
    ],
    pricing: {
      roomOnly: { single: 6000, double: 7000 },
      breakfast: { single: 7000, double: 7500 },
    },
  },
];

type Room = typeof rooms[0];

type BookingForm = {
  name: string; email: string; phone: string;
  checkIn: string; checkOut: string; adults: string;
  children: string; mealPlan: string; specialReq: string;
};

function BookingModal({ room, onClose }: { room: Room; onClose: () => void }) {
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
          roomType: room.badge ? `${room.name} ${room.badge}` : room.name,
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
              {room.name}{room.badge && <> <span className="grad-text">{room.badge}</span></>}
            </h3>
            <p className="text-[12px] text-white/40 mt-0.5">Complete your booking request</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
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
              Booking Submitted!
            </h4>
            <p className="text-white/50 text-[13px] mb-6">We&apos;ll confirm within 2 hours and reach you at your email and phone.</p>
            <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-5 text-left mb-6">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Booking ID</p><p className="text-white font-mono font-bold">#{result.bookingId.slice(-6).toUpperCase()}</p></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Nights</p><p className="text-white font-bold">{result.totalNights}</p></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Total (incl. 5% GST)</p><p className="text-white font-bold">₹{result.totalAmount.toLocaleString("en-IN")}</p></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Advance (25%)</p>
                  <p className="font-bold grad-text">₹{result.advancePaid.toLocaleString("en-IN")}</p></div>
              </div>
            </div>
            <button onClick={onClose} className="btn-rainbow text-[14px] font-semibold px-8 py-3 rounded-xl w-full">
              <span>Done</span>
            </button>
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Full Name</label>
                <input type="text" required placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#7357FF]/60 transition-colors" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Email</label>
                <input type="email" required placeholder="your@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#7357FF]/60 transition-colors" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Phone</label>
                <input type="tel" required placeholder="+91 XXXXX XXXXX" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#7357FF]/60 transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Check-in</label>
                <input type="date" min={today} value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#7357FF]/60 [color-scheme:dark]" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Check-out</label>
                <input type="date" min={form.checkIn} value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#7357FF]/60 [color-scheme:dark]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "adults", label: "Adults", opts: [1, 2, 3] },
                { key: "children", label: "Children", opts: [0, 1, 2] },
              ].map(({ key, label, opts }) => (
                <div key={key}>
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">{label}</label>
                  <select value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#7357FF]/60">
                    {opts.map((n) => <option key={n} value={n} className="bg-[#0F0F1A]">{n}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Meal Plan</label>
                <select value={form.mealPlan} onChange={(e) => setForm({ ...form, mealPlan: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#7357FF]/60">
                  <option value="room-only" className="bg-[#0F0F1A]">Room Only</option>
                  <option value="breakfast" className="bg-[#0F0F1A]">+ Breakfast</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest block mb-1.5">Special Requests</label>
              <textarea rows={2} placeholder="Any special requirements..." value={form.specialReq}
                onChange={(e) => setForm({ ...form, specialReq: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#7357FF]/60 resize-none" />
            </div>

            {nights > 0 && (
              <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider">Est. Total (incl. 5% GST)</p>
                  <p className="text-[20px] font-bold text-white">₹{estimatedTotal.toLocaleString("en-IN")}</p>
                  <p className="text-[11px] text-white/40">{nights} night{nights > 1 ? "s" : ""} · Advance: <span className="grad-text font-semibold">₹{advanceEst.toLocaleString("en-IN")}</span></p>
                </div>
              </div>
            )}

            {error && <p className="text-red-400 text-[13px]">{error}</p>}

            <button onClick={handleSubmit} disabled={loading || !isValid}
              className="btn-rainbow text-[14px] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              <span>{loading ? "Submitting…" : "Submit Booking Request"}</span>
            </button>
            <p className="text-[11px] text-white/30 text-center">
              25% advance required to confirm. Our team will contact you within 2 hours.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function RoomsSection() {
  const [activeModal, setActiveModal] = useState<Room | null>(null);

  return (
    <section className="bg-white py-28" id="rooms">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Our Rooms</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            特別なスイートルーム
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">Spacious Suites Crafted for Comfortable Long Stays</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rooms.map((room, i) => (
            <motion.div key={room.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass-card grad-border-hover rounded-3xl overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={room.imageSrc} alt={room.imageAlt} className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090F]/80 to-transparent" />
                {room.badge && (
                  <span className="absolute top-4 right-4 text-[11px] font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }}>{room.badge}</span>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {[{ icon: <Ruler size={10} />, label: room.area }, { icon: <BedDouble size={10} />, label: room.beds }, { icon: <Users size={10} />, label: room.occupancy }].map((tag) => (
                    <span key={tag.label} className="bg-white/10 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">{tag.icon} {tag.label}</span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-[20px] font-bold text-[#1A1A2A] leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {room.name}{room.badge && <> <span className="grad-text">{room.badge}</span></>}
                  </h3>
                  <p className="text-[12px] text-[#9CA3AF] mt-1">{room.count} rooms available</p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
                  {room.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                      <Check size={10} strokeWidth={2.5} style={{ color: "#7357FF" }} className="flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-xl p-4 mb-5">
                  <p className="section-label text-[10px] mb-3">Room Tariff</p>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-[#9CA3AF] mb-1 uppercase tracking-wider"><span /><span className="text-center">Single</span><span className="text-center">Double</span></div>
                  {[{ label: "Room Only", key: "roomOnly" as const }, { label: "+ Breakfast", key: "breakfast" as const }].map(({ label, key }) => (
                    <div key={key} className="grid grid-cols-3 gap-2 py-2 border-t border-[#F3F4F6] text-[12px]">
                      <span className="text-[#6B7280]">{label}</span>
                      <span className="text-[#1A1A2A] font-semibold text-center">₹{room.pricing[key].single.toLocaleString()}</span>
                      <span className="text-[#1A1A2A] font-semibold text-center">₹{room.pricing[key].double.toLocaleString()}</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-[#9CA3AF] mt-2">+5% GST · +₹1,000/extra adult</p>
                </div>

                <button onClick={() => setActiveModal(room)}
                  className="btn-rainbow mt-auto text-[13px] font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
                  <span>Book This Room</span> <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 glass-card rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <p className="section-label text-[10px] mb-2">Cancellation Policy</p>
            <p className="text-[13px] text-[#6B7280]">24h+ notice → Full Refund · Within 24h → Full Charge</p>
          </div>
          <div className="flex-1">
            <p className="section-label text-[10px] mb-2">Booking Info</p>
            <p className="text-[13px] text-[#6B7280]">25% advance via CC Avenue · <a href="mailto:reservation@limetreehotels.com" className="grad-text">reservation@limetreehotels.com</a></p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeModal && <BookingModal room={activeModal} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </section>
  );
}
