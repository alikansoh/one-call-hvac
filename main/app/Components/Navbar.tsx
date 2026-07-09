"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      if (mobileOpen) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap
          .timeline()
          .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
          .fromTo(
            ".mobile-link",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
            "-=0.15"
          )
          .fromTo(
            ".mobile-footer",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
            "-=0.2"
          );
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(10,42,82,0.35)] py-0.5 sm:py-1"
            : "bg-transparent py-1 sm:py-2"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="One Call HVAC - Heating and Cooling Services in London"
              width={340}
              height={120}
              className={`w-auto transition-all duration-300 ${
                scrolled
                  ? "h-16 sm:h-20 md:h-24 lg:h-28"
                  : "h-24 sm:h-28 md:h-32 lg:h-36"
              }`}
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 font-heading font-semibold text-sm tracking-wide">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-700 hover:after:w-full after:transition-all after:duration-300 ${
                    scrolled
                      ? "text-blue-900 hover:text-blue-700"
                      : "text-white hover:text-blue-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="tel:+10000000000"
              className={`flex items-center gap-2 font-semibold text-sm transition-colors duration-300 ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              <Phone size={18} className={scrolled ? "text-blue-700" : "text-blue-300"} />
              (000) 000-0000
            </Link>

            <Link
              href="#contact"
              className="font-heading font-bold text-sm px-5 py-2.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </div>

          <button
            className={`lg:hidden relative z-[60] flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
              mobileOpen ? "bg-white/10" : ""
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="text-white" size={22} />
            ) : (
              <Menu className={scrolled ? "text-blue-900" : "text-white"} size={22} />
            )}
          </button>
        </nav>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        ref={overlayRef}
        className="lg:hidden fixed inset-0 z-50 hidden flex-col bg-gradient-to-b from-[#04162e] to-[#0a2a52] opacity-0"
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="absolute top-3 right-4 sm:top-4 sm:right-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col justify-center flex-1 px-5">
          <ul className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <li key={link.label} className="mobile-link border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 font-heading font-bold text-2xl sm:text-3xl text-white hover:text-blue-300 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-footer px-5 pb-5 flex flex-col gap-2.5">
          <Link
            href="tel:+10000000000"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-white font-semibold"
          >
            <Phone size={18} className="text-blue-300" />
            (000) 000-0000
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-center font-heading font-bold px-5 py-2.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}