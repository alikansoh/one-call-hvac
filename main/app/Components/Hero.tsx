"use client";

import { useEffect, useRef, useState, useCallback, type FormEvent } from "react";
import {
  Phone,
  Snowflake,
  Flame,
  X,
  User,
  Mail,
  Wrench,
  MapPin,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";

const MODES = [
  { word: "COOL", Icon: Snowflake, color: "#60a5fa" },
  { word: "WARM", Icon: Flame, color: "#ff8a3d" },
];

function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "AC Repair",
    postcode: "",
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
      <div className="w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-8 text-center">
        <p className="font-heading font-bold text-lg text-blue-900">Thanks — we got it!</p>
        <p className="mt-2 text-sm text-gray-600">
          A technician will call you back within 30 minutes.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-colors";
  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-600";

  return (
    <div className="w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-7">
      <div className="mb-5">
        <p className="font-heading font-bold text-blue-900 text-xl leading-tight">
          Get a Free Quote
        </p>
        <p className="text-xs text-gray-500 mt-1">Response within 30 minutes, 24/7.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="qf-name" className={labelClass}>
            Full name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="qf-name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Smith"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="qf-phone" className={labelClass}>
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="qf-phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(000) 000-0000"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="qf-email" className={labelClass}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="qf-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="qf-service" className={labelClass}>
            Service needed
          </label>
          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              id="qf-service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className={`${inputClass} appearance-none bg-white`}
            >
              <option>AC Repair</option>
              <option>AC Installation</option>
              <option>Heating Repair</option>
              <option>Maintenance</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="qf-postcode" className={labelClass}>
            Postcode
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="qf-postcode"
              type="text"
              autoComplete="postal-code"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              placeholder="e.g. SW1A 1AA"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="qf-message" className={labelClass}>
            Message <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="qf-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us what's going on"
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="group mt-1 flex items-center justify-center gap-2 font-heading font-bold text-sm px-5 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300"
        >
          Get Free Quote
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        <p className="text-[11px] text-gray-400 text-center">
          <span className="text-red-500">*</span> Required · No spam, we respect your privacy.
        </p>
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
    // `onClose` is stabilized with useCallback by the parent, so this effect
    // only re-runs when `open` actually changes — not on every unrelated
    // Hero re-render (e.g. the mode/temp auto-cycle every 2.8s).
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:hidden">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#03142b]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button lives outside the scroll area so it's always visible,
          even if the form content below is taller than the viewport. */}
      <div ref={cardRef} className="relative w-full max-w-sm">
        <button
          onClick={onClose}
          aria-label="Close quote form"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-900 shadow-lg"
        >
          <X size={18} />
        </button>

        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}

function ClimateUnit({ mode, temp }: { mode: number; temp: number }) {
  const flow = mode === 0 ? "#5fc2fb" : "#ff7a2e";

  const streaks = [
    { dx: -30, delay: "0s", duration: "2s" },
    { dx: -10, delay: "0.4s", duration: "2.2s" },
    { dx: 8, delay: "0.8s", duration: "2.1s" },
    { dx: 28, delay: "1.2s", duration: "2.3s" },
  ];

  return (
    <div className="relative shrink-0" style={{ width: 210, height: 92 }}>
      <div
        className="absolute inset-x-8 bottom-0 h-9 rounded-full blur-xl transition-colors duration-700"
        style={{ background: flow, opacity: 0.35 }}
      />

      <div
        className="absolute left-0 top-0 animate-[unitSway_8s_ease-in-out_infinite]"
        style={{ width: 210, height: 58, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-[10px] overflow-hidden"
          style={{ background: "linear-gradient(160deg,#f5f7f9,#d7dce1)" }}
        >
          <span className="absolute left-3.5 top-2.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_2px_rgba(52,211,153,0.7)]" />

          <div className="absolute right-3.5 top-1.5 flex items-baseline gap-0.5">
            <span
              key={temp}
              className="font-heading text-lg font-bold tabular-nums leading-none animate-[tempPop_0.3s_ease]"
              style={{ color: flow, textShadow: `0 0 8px ${flow}88`, transition: "color 0.6s ease" }}
            >
              {temp}
            </span>
            <span
              className="text-[10px] font-bold"
              style={{ color: flow, transition: "color 0.6s ease" }}
            >
              °C
            </span>
          </div>

          <div className="absolute inset-x-4 bottom-3.5 flex flex-col gap-[3px]">
            <span className="h-px bg-black/10" />
            <span className="h-px bg-black/10" />
          </div>
        </div>

        <div
          className="absolute rounded-t-[10px]"
          style={{
            top: -13,
            left: 0,
            width: 210,
            height: 13,
            background: "#e7eaed",
            transformOrigin: "bottom",
            transform: "rotateX(90deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: 0,
            left: 210,
            width: 13,
            height: 58,
            background: "#c3c9ce",
            transformOrigin: "left",
            transform: "rotateY(90deg)",
          }}
        />

        <div
          key={mode}
          className="absolute rounded-b-[6px] animate-[ventPulse_0.5s_ease]"
          style={{
            bottom: -8,
            left: 13,
            width: 184,
            height: 8,
            background: "linear-gradient(180deg,#e2e6e9,#c9cfd4)",
            transformOrigin: "top",
          }}
        />

        {streaks.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-[airFlow_ease-out_infinite]"
            style={
              {
                bottom: -8,
                left: "50%",
                width: 5,
                height: 5,
                background: flow,
                boxShadow: `0 0 8px 2px ${flow}`,
                animationDuration: s.duration,
                animationDelay: s.delay,
                "--dx": `${s.dx}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <style>{`
        @keyframes unitSway {
          0%, 100% { transform: rotateX(-14deg) rotateY(20deg); }
          50% { transform: rotateX(-17deg) rotateY(26deg); }
        }
        @keyframes airFlow {
          0% { transform: translate(-50%, 0) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), 30px) scale(1.1); opacity: 0; }
        }
        @keyframes tempPop {
          0% { opacity: 0; transform: translateY(-4px) scale(0.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ventPulse {
          0% { transform: rotateX(12deg); }
          45% { transform: rotateX(46deg); }
          100% { transform: rotateX(32deg); }
        }
      `}</style>
    </div>
  );
}

function Remote({
  mode,
  temp,
  onSelectMode,
  onAdjustTemp,
}: {
  mode: number;
  temp: number;
  onSelectMode: (m: number) => void;
  onAdjustTemp: (delta: number) => void;
}) {
  const flow = mode === 0 ? "#5fc2fb" : "#ff7a2e";

  return (
    <div className="relative shrink-0 select-none" style={{ width: 50 }}>
      <div className="rounded-2xl bg-gradient-to-b from-[#2c3542] to-[#1a212b] p-2 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
        <div className="rounded-md bg-[#0b1016] py-1.5 mb-2 ring-1 ring-black/40">
          <p
            key={temp}
            className="font-heading text-[13px] font-bold tabular-nums text-center leading-none animate-[tempPop_0.3s_ease]"
            style={{ color: flow, textShadow: `0 0 6px ${flow}99` }}
          >
            {temp}°
          </p>
        </div>

        <div className="flex items-center justify-between gap-1 mb-2">
          <button
            type="button"
            aria-label="Lower temperature"
            onClick={() => onAdjustTemp(-1)}
            className="flex-1 rounded-md bg-white/5 hover:bg-white/10 active:scale-90 active:bg-white/15 text-white/70 text-xs font-bold py-1 transition-transform"
          >
            −
          </button>
          <button
            type="button"
            aria-label="Raise temperature"
            onClick={() => onAdjustTemp(1)}
            className="flex-1 rounded-md bg-white/5 hover:bg-white/10 active:scale-90 active:bg-white/15 text-white/70 text-xs font-bold py-1 transition-transform"
          >
            +
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Switch to cool"
            aria-pressed={mode === 0}
            onClick={() => onSelectMode(0)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90 ${
              mode === 0
                ? "bg-blue-500/90 shadow-[0_0_10px_2px_rgba(96,165,250,0.7)]"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <Snowflake size={14} className={mode === 0 ? "text-white" : "text-white/50"} />
          </button>
          <button
            type="button"
            aria-label="Switch to warm"
            aria-pressed={mode === 1}
            onClick={() => onSelectMode(1)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90 ${
              mode === 1
                ? "bg-orange-500/90 shadow-[0_0_10px_2px_rgba(255,138,61,0.7)]"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <Flame size={14} className={mode === 1 ? "text-white" : "text-white/50"} />
          </button>
        </div>
      </div>

      <div
        className="absolute top-1 rounded-r-2xl"
        style={{
          left: "100%",
          width: 5,
          height: "calc(100% - 8px)",
          background: "#141a22",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordBoxRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState(0);
  const [temp, setTemp] = useState(18);
  const [userControlled, setUserControlled] = useState(false);
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
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 18, letterSpacing: "0.02em" },
          { opacity: 1, y: 0, letterSpacing: "0em", duration: 0.7, ease: "power2.out" },
          "-=0.45"
        )
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

  // Auto-cycle mode + temp together in one state update so they never
  // desync and so we don't cascade a second render from a separate effect.
  useEffect(() => {
    if (reducedMotion.current || userControlled) return;
    const id = setInterval(() => {
      setMode((m) => {
        const next = (m + 1) % MODES.length;
        setTemp(next === 0 ? 18 : 24);
        return next;
      });
    }, 2800);
    return () => clearInterval(id);
  }, [userControlled]);

  useEffect(() => {
    if (!wordBoxRef.current) return;
    gsap.fromTo(
      wordBoxRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [mode]);

  const selectMode = (m: number) => {
    setUserControlled(true);
    setMode(m);
    setTemp(m === 0 ? 18 : 24);
  };

  const adjustTemp = (delta: number) => {
    setUserControlled(true);
    setTemp((t) => Math.min(30, Math.max(16, t + delta)));
  };

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

  // Stable reference so QuoteModal's entrance-animation effect (which
  // depends on `onClose`) doesn't re-fire on every unrelated Hero
  // re-render from the mode/temp auto-cycle.
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const Current = MODES[mode];

  return (
    <div className="w-full overflow-x-hidden">
      <section
        ref={rootRef}
        className="relative left-1/2 -translate-x-1/2 w-screen min-h-[100svh] overflow-hidden"
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

        <div className="relative z-10 flex min-h-[100svh] w-full items-center py-12 sm:py-16 lg:pt-24 lg:pb-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12 xl:gap-16">
              <div className="lg:flex-1 min-w-0">
                <h1 className="font-heading font-extrabold text-white leading-[0.95] tracking-tight text-balance w-full max-w-[92vw] sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl text-[clamp(2.25rem,7.5vw,2.75rem)] sm:text-[clamp(2.5rem,6vw,3.25rem)] lg:text-[clamp(2.75rem,4.2vw,4rem)] xl:text-[clamp(3rem,3.8vw,4.5rem)]">
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
                          className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 -translate-y-0.5"
                          strokeWidth={2.25}
                        />
                      </span>
                    </span>
                  </div>
                  <div className="hero-line overflow-hidden">
                    <span className="inline-block">all year round.</span>
                  </div>
                </h1>

                <p className="hero-sub mt-5 sm:mt-6 text-base sm:text-lg md:text-xl font-semibold text-white/95 leading-snug max-w-md tracking-wide [text-wrap:balance] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                  Trusted heating and cooling specialists serving homes and
                  businesses across{" "}
                  <span className="relative text-white font-extrabold">
                    London
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full" />
                  </span>
                  . Same-day service, upfront pricing, no surprises.
                </p>

                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleQuoteClick}
                    className="hero-btn lg:hidden font-heading font-bold text-sm text-center px-6 py-3 sm:py-3.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300"
                  >
                    Get Free Quote
                  </button>

                  <a
                    href="tel:+10000000000"
                    className="hero-btn flex items-center justify-center gap-2 font-heading font-bold text-sm px-6 py-3 sm:py-3.5 rounded-md border border-white/25 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    <Phone size={17} className="text-white/70" />
                    (000) 000-0000
                  </a>
                </div>

                <div
                  className="hero-trust mt-9 sm:mt-10 flex items-end gap-5 sm:gap-8"
                  style={{ perspective: 700 }}
                >
                  <ClimateUnit mode={mode} temp={temp} />
                  <Remote
                    mode={mode}
                    temp={temp}
                    onSelectMode={selectMode}
                    onAdjustTemp={adjustTemp}
                  />
                </div>
              </div>

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

      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </div>
  );
}