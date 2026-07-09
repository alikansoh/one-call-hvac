"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone,
  Snowflake,
  Flame,
  Star,
  X,
  User,
  Mail,
  Wrench,
  Clock,
} from "lucide-react";
import gsap from "gsap";

const MODES = [
  { word: "COOL", Icon: Snowflake, color: "#7dd3fc" },
  { word: "WARM", Icon: Flame, color: "#ff8a3d" },
];

function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "AC Repair",
    time: "As soon as possible",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: wire this up to a real endpoint (API route, Formspree, Resend, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full rounded-2xl bg-white shadow-2xl p-8 text-center">
        <p className="font-heading font-bold text-lg text-blue-900">Thanks — we got it!</p>
        <p className="mt-2 text-sm text-gray-600">
          A technician will call you back within 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white shadow-2xl p-6 sm:p-7">
      <div className="mb-5">
        <p className="font-heading font-bold text-blue-900 text-xl leading-tight">
          Get a Free Quote
        </p>
        <p className="text-xs text-gray-500 mt-1">Response within 30 minutes, 24/7.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
            />
          </div>
        </div>

        <div className="relative">
          <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full appearance-none rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
          >
            <option>AC Repair</option>
            <option>AC Installation</option>
            <option>Heating Repair</option>
            <option>Maintenance</option>
            <option>Other</option>
          </select>
        </div>

        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full appearance-none rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
          >
            <option>As soon as possible</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us what's going on (optional)"
          rows={2}
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
        />

        <button
          type="submit"
          className="mt-1 font-heading font-bold text-sm px-5 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:brightness-110 transition-all duration-300"
        >
          Get Free Quote
        </button>

        <p className="text-[11px] text-gray-400 text-center">No spam. We respect your privacy.</p>
      </form>
    </div>
  );
}

function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:hidden">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#03142b]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div ref={cardRef} className="relative w-full max-w-sm">
        <button
          onClick={onClose}
          aria-label="Close quote form"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-900 shadow-lg"
        >
          <X size={18} />
        </button>
        <QuoteForm />
      </div>
    </div>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordBoxRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-line > span",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, stagger: 0.12 }
      )
        .fromTo(".hero-sub", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .fromTo(
          ".hero-btn",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(".hero-trust", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .fromTo(
          ".hero-form",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(".hero-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const id = setInterval(() => setMode((m) => (m + 1) % MODES.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!wordBoxRef.current) return;
    gsap.fromTo(
      wordBoxRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [mode]);

  const handleQuoteClick = () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      const el = document.getElementById("hero-quote-form");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      gsap.fromTo(
        el,
        { boxShadow: "0 0 0 0 rgba(37,99,235,0)" },
        {
          boxShadow: "0 0 0 6px rgba(37,99,235,0.25)",
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        }
      );
    } else {
      setQuoteOpen(true);
    }
  };

  const Current = MODES[mode];

  return (
    <>
      <section
        ref={rootRef}
        className="relative left-1/2 -translate-x-1/2 w-screen h-[100svh] min-h-[640px] overflow-hidden"
      >
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[#03142b]/80 via-[#03142b]/45 to-[#03142b]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03142b]/35 via-transparent to-[#03142b]/45" />

        <div className="relative z-10 flex h-full w-full items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-28 sm:pt-32 lg:pt-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-8">
              {/* Left: copy */}
              <div className="max-w-xl">
                <h1 className="font-heading font-extrabold text-white leading-[0.97] tracking-tight text-[clamp(2.1rem,6vw,4.5rem)] text-balance">
                  <div className="hero-line overflow-hidden">
                    <span className="inline-block">Comfort that</span>
                  </div>
                  <div className="hero-line overflow-hidden flex items-baseline gap-3 flex-wrap">
                    <span className="inline-block">stays</span>
                    <span className="relative inline-flex h-[1em] items-baseline overflow-hidden">
                      <span
                        ref={wordBoxRef}
                        style={{ color: Current.color }}
                        className="inline-flex items-center gap-2"
                      >
                        {Current.word}
                        <Current.Icon
                          className="w-7 h-7 sm:w-9 sm:h-9 -translate-y-0.5"
                          strokeWidth={2.25}
                        />
                      </span>
                    </span>
                  </div>
                  <div className="hero-line overflow-hidden">
                    <span className="inline-block">all year round.</span>
                  </div>
                </h1>

                <p className="hero-sub mt-6 text-[15px] sm:text-lg text-white/70 font-normal leading-relaxed max-w-md">
                  Trusted heating and cooling specialists serving homes and
                  businesses across{" "}
                  <span className="text-white font-semibold">London</span>.
                  Same-day service, upfront pricing, no surprises.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleQuoteClick}
                    className="hero-btn font-heading font-bold text-sm text-center px-7 py-3.5 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:brightness-110 transition-all duration-300"
                  >
                    Get Free Quote
                  </button>
                  
                    <a href="tel:+10000000000"
                    className="hero-btn flex items-center justify-center gap-2 font-heading font-bold text-sm px-7 py-3.5 rounded-md border border-white/25 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    <Phone size={17} className="text-white/70" />
                    (000) 000-0000
                  </a>
                </div>

                <div className="hero-trust mt-9 inline-flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2.5">
                  <div className="flex items-center gap-0.5 text-orange-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <div className="h-4 w-px bg-white/20" />
                  <p className="text-white/85 text-xs sm:text-sm">
                    <span className="font-heading font-bold text-white">4.9</span> rated by{" "}
                    <span className="font-heading font-bold text-white">500+</span> London
                    homeowners
                  </p>
                </div>
              </div>

              {/* Right: quote form — desktop only, mobile uses modal */}
              <div
                id="hero-quote-form"
                className="hero-form hidden lg:block lg:w-[380px] lg:shrink-0 rounded-2xl"
              >
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue absolute bottom-8 left-6 sm:left-8 z-10 hidden lg:block">
          <span className="block h-10 w-px bg-white/25 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 w-full bg-white animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          </span>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}