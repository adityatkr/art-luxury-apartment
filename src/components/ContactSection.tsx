"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" });
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setStep("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[14px] text-[#1A1A2A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#7357FF] focus:ring-1 focus:ring-[#7357FF]/20 transition-all";

  return (
    <section className="bg-[#F7F8FA] py-28" id="contact">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Get in Touch</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            お問い合わせ
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">We&apos;d Love to Host You</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="flex flex-col gap-4">
            {[
              { icon: <MapPin size={18} strokeWidth={1.5} />, label: "Address", value: "517, Sector 27, Golf Course Road\nGurgaon, Haryana 122002" },
              { icon: <Phone size={18} strokeWidth={1.5} />, label: "Phone", value: "+91 74280 95672", href: "tel:+917428095672" },
              { icon: <Mail size={18} strokeWidth={1.5} />, label: "Reservations", value: "reservation@limetreehotels.com", href: "mailto:reservation@limetreehotels.com" },
              { icon: <Clock size={18} strokeWidth={1.5} />, label: "Check-in / Check-out", value: "Check-in: 2:00 PM  ·  Check-out: 11:00 AM" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(115,87,255,0.1), rgba(255,138,69,0.1))" }}>
                  <span className="grad-text">{item.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold section-label mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[14px] text-[#1A1A2A] hover:text-[#7357FF] transition-colors whitespace-pre-line">{item.value}</a>
                  ) : (
                    <p className="text-[14px] text-[#1A1A2A] whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-5 mt-1 text-white"
              style={{ background: "linear-gradient(135deg, #7357FF 0%, #C344D8 50%, #FF8A45 100%)" }}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] mb-2 text-white/70">Booking Note</p>
              <p className="text-[13px] text-white/85 leading-relaxed">25% advance required · CC Avenue · 5% GST · Managed via Staah</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
            <h3 className="text-[20px] font-bold text-[#1A1A2A] mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Send an Enquiry
            </h3>

            {step === "success" ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7357FF, #FF8A45)" }}>
                  <Send size={22} className="text-white" />
                </div>
                <p className="text-[16px] font-semibold text-[#1A1A2A] mb-2">Message Sent!</p>
                <p className="text-[13px] text-[#6B7280]">We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => { setStep("form"); setForm({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" }); }}
                  className="mt-6 text-[12px] grad-text hover:opacity-80 transition-opacity">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-semibold section-label block mb-1.5">Name</label>
                    <input type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold section-label block mb-1.5">Email</label>
                    <input type="email" required placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold section-label block mb-1.5">Phone</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold section-label block mb-1.5">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls}>
                    {["General Enquiry", "Room Booking", "Long Stay Package", "Corporate Rates", "Restaurant Reservation", "Other"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold section-label block mb-1.5">Message</label>
                  <textarea rows={4} required placeholder="Tell us how we can help..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} />
                </div>
                {error && <p className="text-red-500 text-[13px]">{error}</p>}
                <button type="submit" disabled={loading}
                  className="btn-rainbow text-[14px] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}
                  <span>{loading ? "Sending…" : "Send Message"}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
