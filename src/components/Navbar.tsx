"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle } = useLanguage();

  const T = {
    en: { rooms: "Rooms", restaurants: "Restaurants", offers: "Offers", gallery: "Gallery", contact: "Contact", bookNow: "Book Now" },
    ja: { rooms: "客室", restaurants: "レストラン", offers: "ご提案", gallery: "ギャラリー", contact: "お問い合わせ", bookNow: "予約する" },
  }[lang];

  const navLinks = [
    { label: T.rooms, href: "#rooms" },
    { label: T.restaurants, href: "#restaurants" },
    { label: T.offers, href: "#offers" },
    { label: T.gallery, href: "#gallery" },
    { label: T.contact, href: "#contact" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-[76px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Art Apartment"
              height={44}
              width={100}
              style={{ height: "44px", width: "auto" }}
              className="object-contain"
              priority
            />
            <div className={`hidden sm:block border-l pl-3 transition-colors duration-300 ${scrolled ? "border-[#E5E7EB]" : "border-white/15"}`}>
              <p className={`text-[11px] font-semibold tracking-[0.1em] uppercase leading-tight transition-colors duration-300 ${scrolled ? "text-[#374151]" : "text-white"}`}>Art: Luxury Serviced Apt</p>
              <p className={`text-[9px] tracking-[0.12em] uppercase leading-tight transition-colors duration-300 ${scrolled ? "text-[#6B7280]" : "text-white/70"}`}>Golf Course Road, Gurugram</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 ${scrolled ? "text-[#374151] hover:text-[#7357FF]" : "text-white/75 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917428095672"
              className={`flex items-center gap-2 text-[12px] font-medium transition-colors ${scrolled ? "text-[#374151] hover:text-[#374151]" : "text-white/85 hover:text-white"}`}
            >
              <Phone size={13} strokeWidth={1.5} />
              +91 74280 95672
            </a>

            {/* Language toggle */}
            <button
              onClick={toggle}
              className={`text-[11px] font-bold tracking-[0.08em] px-3 py-1.5 rounded-full border transition-all duration-200 ${
                scrolled
                  ? "border-[#E5E7EB] text-[#374151] hover:border-[#7357FF] hover:text-[#7357FF]"
                  : "border-white/25 text-white/70 hover:border-white/60 hover:text-white"
              }`}
            >
              {lang === "en" ? "日本語" : "EN"}
            </button>

            <a
              href="#rooms"
              className="btn-rainbow text-[13px] font-semibold tracking-[0.04em] px-5 py-2.5 rounded-full"
            >
              <span>{T.bookNow}</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? "text-[#374151]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-[#E5E7EB] overflow-hidden"
          >
            <div className="max-w-[1280px] mx-auto px-8 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[15px] font-medium text-[#374151] hover:text-[#7357FF] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-4">
                  <a href="tel:+917428095672" className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <Phone size={13} /> +91 74280 95672
                  </a>
                  <button
                    onClick={toggle}
                    className="text-[11px] font-bold tracking-[0.08em] px-3 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#7357FF] hover:text-[#7357FF] transition-all"
                  >
                    {lang === "en" ? "日本語" : "EN"}
                  </button>
                </div>
                <a
                  href="#rooms"
                  onClick={() => setMobileOpen(false)}
                  className="btn-rainbow block text-[14px] font-semibold text-center py-3.5 rounded-xl"
                >
                  <span>{T.bookNow}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
