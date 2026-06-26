"use client";

import { motion } from "framer-motion";
import {
  Star, Wifi, Coffee, ShieldCheck, MapPin, UtensilsCrossed,
  BedDouble, Home, Clock, Gem, UserCheck, Zap
} from "lucide-react";

const features = [
  { icon: <Star size={22} strokeWidth={1.3} />, title: "Japanese Friendly", desc: "Staff trained in Japanese hospitality with dedicated support for Japanese guests and executives." },
  { icon: <Gem size={22} strokeWidth={1.3} />, title: "Spacious 1 BHK Suites", desc: "300 sq ft suites with a separate bedroom, living area, and fully equipped kitchen." },
  { icon: <Home size={22} strokeWidth={1.3} />, title: "Separate Living Room", desc: "A proper living space to work, relax, or entertain — not just a room with a chair." },
  { icon: <Coffee size={22} strokeWidth={1.3} />, title: "Fully Equipped Kitchen", desc: "Cook your own meals. Hob, microwave, utensils, and refrigerator included." },
  { icon: <MapPin size={22} strokeWidth={1.3} />, title: "Golf Course Road", desc: "Prime location on Gurgaon's most prestigious business corridor — near DLF, Cyber City, and MNC offices." },
  { icon: <UtensilsCrossed size={22} strokeWidth={1.3} />, title: "Japanese Restaurant", desc: "Arata serves authentic Japanese fusion cuisine in a fine-dining setting. Open 6 AM to 10:30 PM." },
  { icon: <Clock size={22} strokeWidth={1.3} />, title: "Long Stay Friendly", desc: "Special packages for weekly, monthly, and quarterly stays. Your home away from home." },
  { icon: <UserCheck size={22} strokeWidth={1.3} />, title: "Corporate Friendly", desc: "Invoice billing, corporate rates, and seamless check-in for business travelers." },
  { icon: <ShieldCheck size={22} strokeWidth={1.3} />, title: "Hygienic Stay", desc: "Hospital-grade housekeeping, UV sanitation, and daily linen change included." },
  { icon: <BedDouble size={22} strokeWidth={1.3} />, title: "24×7 Room Service", desc: "Round-the-clock room service from our in-house kitchen, available every day of the year." },
  { icon: <Zap size={22} strokeWidth={1.3} />, title: "Express Check-in", desc: "Digital check-in available. Your suite is ready before you arrive." },
  { icon: <Wifi size={22} strokeWidth={1.3} />, title: "Premium Amenities", desc: "43-inch Smart TV, high-speed WiFi, mini bar, in-room safe, and luxury toiletries." },
];

export default function WhyChooseUs() {
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
            Why Choose Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}
          >
            選ばれる理由
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">Designed for Guests Who Demand More</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
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
                <div className="group-hover:grad-text transition-all"
                  style={{ color: "inherit" }}>
                  {f.icon}
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
