"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
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
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll without the iOS "jump to top" / rubber-band side effects
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!overlayRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal the menu as a circle expanding out from the toggle button,
    // so the motion visibly originates from the control that triggered it.
    const originPoint = () => {
      const rect = toggleRef.current?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : window.innerWidth - 32;
      const cy = rect ? rect.top + rect.height / 2 : 32;
      const maxRadius = Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy)
      );
      return { cx, cy, maxRadius };
    };

    const ctx = gsap.context(() => {
      if (mobileOpen) {
        const { cx, cy, maxRadius } = originPoint();

        if (reduceMotion) {
          gsap.set(overlayRef.current, {
            display: "flex",
            clipPath: `circle(${maxRadius}px at ${cx}px ${cy}px)`,
            opacity: 1,
          });
          gsap.set([".mobile-link", ".mobile-footer"], { opacity: 1, y: 0 });
          return;
        }

        gsap.set(overlayRef.current, {
          display: "flex",
          opacity: 1,
          clipPath: `circle(0px at ${cx}px ${cy}px)`,
        });

        gsap
          .timeline()
          .to(overlayRef.current, {
            clipPath: `circle(${maxRadius}px at ${cx}px ${cy}px)`,
            duration: 0.7,
            ease: "power3.inOut",
          })
          .fromTo(
            ".mobile-link",
            { opacity: 0, y: 22, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              stagger: 0.06,
              ease: "power3.out",
            },
            "-=0.35"
          )
          .fromTo(
            ".mobile-footer",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
            "-=0.2"
          );
      } else {
        const { cx, cy } = originPoint();

        if (reduceMotion) {
          gsap.set(overlayRef.current, { display: "none", opacity: 0 });
          return;
        }

        gsap.to(overlayRef.current, {
          clipPath: `circle(0px at ${cx}px ${cy}px)`,
          duration: 0.45,
          ease: "power3.in",
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

  const barColor = mobileOpen
    ? "bg-white"
    : scrolled
    ? "bg-blue-900"
    : "bg-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          mobileOpen ? "z-[65]" : "z-50"
        } ${scrolled ? "py-1 sm:py-1.5" : "py-2 sm:py-3"} ${
          mobileOpen
            ? "bg-transparent"
            : scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(10,42,82,0.35)]"
            : "bg-transparent"
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
                  ? "h-12 sm:h-14 md:h-18 lg:h-20"
                  : "h-16 sm:h-20 md:h-24 lg:h-28"
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
              href="tel:02034885727"
              className={`flex items-center gap-2 font-semibold text-sm transition-colors duration-300 ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              <Phone size={18} className={scrolled ? "text-blue-700" : "text-blue-300"} />
              02034885727            </Link>

            <Link
              href="#contact"
              className="font-heading font-bold text-sm px-5 py-2.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Single toggle: sits above the overlay (z-[70]) so it stays live
              for both opening and closing — no second, redundant close button. */}
          <button
            ref={toggleRef}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden relative z-[70] -mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-150 active:scale-90"
          >
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <span
                className={`h-[2px] w-full origin-center rounded-full transition-all duration-300 ease-out ${barColor} ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full transition-all duration-200 ease-out ${barColor} ${
                  mobileOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`h-[2px] w-full origin-center rounded-full transition-all duration-300 ease-out ${barColor} ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Full-screen mobile menu overlay — revealed via clip-path circle
          from the toggle button, so the animation reads as coming from
          the control the user just tapped. */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        className="lg:hidden fixed inset-0 z-[60] hidden h-[100dvh] flex-col overflow-y-auto bg-gradient-to-b from-[#04162e] to-[#0a2a52] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex flex-col justify-center flex-1 px-6 pt-20">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.label} className="mobile-link border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3.5 font-heading font-bold text-2xl sm:text-3xl text-white active:text-blue-300 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-footer px-6 pb-8 flex flex-col gap-3">
          <Link
            href="tel:02034885727"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-white font-semibold"
          >
            <Phone size={18} className="text-blue-300" />
            02034885727
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-center font-heading font-bold px-5 py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}