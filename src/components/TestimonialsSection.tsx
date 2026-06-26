"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tanaka Hiroshi",
    role: "Japanese Business Traveler",
    rating: 5,
    text: "Art: The Luxury Serviced Apartment is one of the few places in Gurgaon where I feel truly comfortable. The Japanese-friendly service, the Arata restaurant, and the spacious 1 BHK suite made my 3-month corporate stay feel like home.",
    stay: "3-Month Corporate Stay",
  },
  {
    name: "Priya Mehta",
    role: "Corporate Professional, Delhi NCR",
    rating: 5,
    text: "The separate living room and fully equipped kitchen make such a difference for long stays. I could actually cook my own meals and have space to work. The Golf Course Road location is unbeatable for business meetings.",
    stay: "6-Week Stay",
  },
  {
    name: "Michael Chen",
    role: "Expat Executive",
    rating: 5,
    text: "After trying several serviced apartments in Gurgaon, Art: The Luxury Serviced Apartment stands out for its genuine hospitality and attention to detail. The Kaffee Stories rooftop café is where I start every morning.",
    stay: "Ongoing Long Stay",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-28" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Guest Stories</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            お客様の声
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">What Our Guests Say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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
