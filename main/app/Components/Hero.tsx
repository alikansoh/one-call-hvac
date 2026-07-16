"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, Snowflake, Flame } from "lucide-react";
import gsap from "gsap";

const MODES = [
  { word: "COOL", Icon: Snowflake, color: "#60a5fa" },
  { word: "WARM", Icon: Flame, color: "#ff8a3d" },
];

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
          <div className="w-full px-5 sm:px-8">
            <div className="min-w-0 w-full">
              <h1 className="font-heading font-extrabold text-white leading-[0.95] tracking-tight text-balance w-full text-[clamp(2.25rem,7.5vw,2.75rem)] sm:text-[clamp(2.5rem,6vw,3.25rem)] lg:text-[clamp(2.75rem,4.2vw,4rem)] xl:text-[clamp(3rem,3.8vw,4.5rem)]">
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

              <p className="hero-sub mt-5 sm:mt-6 text-base sm:text-lg md:text-xl font-semibold text-white/95 leading-snug w-full max-w-3xl tracking-wide [text-wrap:balance] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                Trusted heating and cooling specialists serving homes and
                businesses across{" "}
                <span className="relative text-white font-extrabold">
                  London
                  <span className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full" />
                </span>
                . Same-day service, upfront pricing, no surprises.
              </p>

              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  href="/quote"
                  className="hero-btn font-heading font-bold text-sm text-center px-6 py-3 sm:py-3.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300"
                >
                  Get Free Quote
                </Link>

                <a
                  href="tel:02034885727"
                  className="hero-btn flex items-center justify-center gap-2 font-heading font-bold text-sm px-6 py-3 sm:py-3.5 rounded-md border border-white/25 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  <Phone size={17} className="text-white/70" />
                  02034885727
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
          </div>
        </div>

        <div className="hero-scroll-cue absolute bottom-8 left-6 sm:left-8 z-10 hidden lg:block">
          <span className="block h-10 w-px bg-white/25 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 w-full bg-white animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          </span>
        </div>
      </section>
    </div>
  );
}