"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "/images/bedroom.png",        alt: "Sora Suite Bedroom",      label: "Bedroom",          span: "col-span-2 row-span-2", pos: "object-center" },
  { src: "/images/living-room.png",    alt: "Suite Living Room",       label: "Living Room",      span: "",                      pos: "object-center" },
  { src: "/images/kitchen.png",        alt: "Fully Equipped Kitchen",  label: "Kitchen",          span: "",                      pos: "object-center" },
  { src: "/images/bathroom.png",       alt: "Luxury Bathroom",         label: "Bathroom",         span: "",                      pos: "object-top" },
  { src: "/images/art-wall.png",       alt: "Suite Art Wall",          label: "Suite Interior",   span: "",                      pos: "object-top" },
  { src: "/images/hotel-exterior.png", alt: "Art Hotel Exterior",      label: "The Building",     span: "",                      pos: "object-center" },
  { src: "/images/corridor.png",       alt: "Hotel Corridor",          label: "Corridors",        span: "",                      pos: "object-center" },
  { src: "/images/room-interior.png",  alt: "Room with Smart TV",      label: "Smart Room",       span: "",                      pos: "object-center" },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="bg-[#F7F8FA] py-28" id="gallery">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label mb-4">Gallery</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-light text-[#1A1A2A] leading-[1.2] mb-2"
            style={{ fontSize: "clamp(28px, 3.8vw, 48px)", fontFamily: "var(--font-noto-sans-jp), sans-serif", letterSpacing: "0.04em" }}>
            フォトギャラリー
          </motion.h2>
          <p className="text-[#9CA3AF] text-[13px] tracking-[0.1em] uppercase">A Glimpse Inside Art</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[220px]">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${img.span}`}
              onClick={() => setLightbox(i)}
            >
              <img src={img.src} alt={img.alt} className={`w-full h-full object-cover ${img.pos} transition-transform duration-700 group-hover:scale-[1.06]`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <ZoomIn size={20} className="text-white" strokeWidth={1.5} />
                  <span className="text-white text-[12px] font-medium">{img.label}</span>
                </div>
              </div>
              {/* Gradient border bottom on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #7357FF, #FF8A45)" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={() => setLightbox(null)}>
            <X size={28} />
          </button>
          <img src={images[lightbox].src} alt={images[lightbox].alt}
            className="max-w-full max-h-[80vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-8 text-white/50 text-[13px]">{images[lightbox].label}</p>
        </div>
      )}
    </section>
  );
}
