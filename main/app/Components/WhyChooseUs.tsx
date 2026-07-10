"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Clock, BadgeDollarSign, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Reason = {
  number: string;
  title: string;
  description: string;
  Icon: typeof ShieldCheck;
  angle: number; // degrees, 0 = top, clockwise
};

const REASONS: Reason[] = [
  {
    number: "01",
    title: "Licensed & Insured",
    description: "Fully certified techs you can trust in your home.",
    Icon: ShieldCheck,
    angle: 315,
  },
  {
    number: "02",
    title: "Fast Response",
    description: "Same-day service, no waiting around all week.",
    Icon: Clock,
    angle: 45,
  },
  {
    number: "03",
    title: "Upfront Pricing",
    description: "You know the cost before we start, no surprises.",
    Icon: BadgeDollarSign,
    angle: 135,
  },
  {
    number: "04",
    title: "5-Star Service",
    description: "Hundreds of happy customers, every job done right.",
    Icon: Star,
    angle: 225,
  },
];

const RING_R = 42; // dial ring radius, in the 0-100 SVG viewBox
const SPOKE_INNER_R = 25; // where spokes start, just outside the technician photo
const SPOKE_OUTER_R = 46; // matches the card radius below
const ARC_HALF_SPAN = 34; // each dial segment covers +/-34deg around its reason

/** Convert a polar coordinate (angle in degrees, 0 = top, clockwise) to the 0-100 viewBox. */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function arcPath(angleDeg: number) {
  const start = polar(50, 50, RING_R, angleDeg - ARC_HALF_SPAN);
  const end = polar(50, 50, RING_R, angleDeg + ARC_HALF_SPAN);
  return `M ${start.x} ${start.y} A ${RING_R} ${RING_R} 0 0 1 ${end.x} ${end.y}`;
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Desktop dial refs
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const spokeRefs = useRef<Array<SVGLineElement | null>>([]);
  const arcRefs = useRef<Array<SVGPathElement | null>>([]);

  // Mobile "vertical dial" refs — same concept (technician radiating out to each
  // numbered reason), just laid out top-to-bottom instead of in a circle so it
  // works on narrow screens.
  const mobileRingRef = useRef<SVGCircleElement>(null);
  const mobileConnectorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileBadgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileNumberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const mobileTextRefs = useRef<Array<HTMLDivElement | null>>([]);

  const positions = useMemo(
    () =>
      REASONS.map((reason) => {
        const rad = (reason.angle * Math.PI) / 180;
        const cx = 50 + SPOKE_OUTER_R * Math.sin(rad);
        const cy = 50 - SPOKE_OUTER_R * Math.cos(rad);
        const spokeStart = polar(50, 50, SPOKE_INNER_R, reason.angle);
        return { cx, cy, spokeStart, arc: arcPath(reason.angle) };
      }),
    []
  );

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Heading + intro
      gsap.fromTo(
        ".why-mask > *",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".why-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      // ---------------------------------------------------------------
      // Desktop dial
      // ---------------------------------------------------------------

      // Base (dashed) ring fades in immediately, dial segments light up per-reason below
      gsap.fromTo(
        ".why-ring-base",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );

      // Each numbered reason is its own choreographed beat: spoke draws in from the
      // technician -> dial segment lights up -> icon badge stamps down -> number pops
      // -> copy slides in. This is where the section's motion budget is spent.
      REASONS.forEach((_, i) => {
        const spoke = spokeRefs.current[i];
        const arc = arcRefs.current[i];
        const badge = badgeRefs.current[i];
        const number = numberRefs.current[i];
        const text = textRefs.current[i];
        const card = cardRefs.current[i];
        if (!card) return;

        const start = i * 0.22;
        const trigger: ScrollTrigger.Vars = {
          trigger: sectionRef.current,
          start: "top 58%",
          once: true,
        };

        gsap.set(card, { opacity: 1 });

        if (spoke) {
          const len = spoke.getTotalLength ? spoke.getTotalLength() : 0;
          gsap.set(spoke, { strokeDasharray: len, strokeDashoffset: reducedMotion ? 0 : len });
          if (!reducedMotion) {
            gsap.to(spoke, {
              strokeDashoffset: 0,
              duration: 0.35,
              delay: start,
              ease: "power2.out",
              scrollTrigger: trigger,
            });
          }
        }

        if (arc) {
          const len = arc.getTotalLength();
          gsap.set(arc, { strokeDasharray: len, strokeDashoffset: reducedMotion ? 0 : len });
          if (!reducedMotion) {
            gsap.to(arc, {
              strokeDashoffset: 0,
              duration: 0.5,
              delay: start + 0.15,
              ease: "power2.inOut",
              scrollTrigger: trigger,
            });
          }
        }

        gsap.fromTo(
          badge,
          { opacity: 0, scale: 0.4, rotate: -20 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            delay: reducedMotion ? 0 : start + 0.2,
            ease: "back.out(1.9)",
            scrollTrigger: trigger,
          }
        );

        gsap.fromTo(
          number,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            delay: reducedMotion ? 0 : start + 0.42,
            ease: "back.out(2.6)",
            scrollTrigger: trigger,
          }
        );

        gsap.fromTo(
          text,
          { opacity: 0, x: 10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            delay: reducedMotion ? 0 : start + 0.48,
            ease: "power3.out",
            scrollTrigger: trigger,
          }
        );
      });

      // ---------------------------------------------------------------
      // Mobile vertical dial — same concept as desktop (technician radiating
      // out to each numbered reason via a connector "spoke"), but arranged
      // top-to-bottom. Reveal is a strict one-by-one sequence: each reason's
      // connector draws, then its badge/number/text land, and ONLY THEN does
      // the next reason begin — no overlapping stagger.
      // ---------------------------------------------------------------
      const mobileTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        defaults: { ease: "power3.out" },
      });

      if (mobileRingRef.current) {
        mobileTl.fromTo(
          mobileRingRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }
        );
      }

      REASONS.forEach((_, i) => {
        const connector = mobileConnectorRefs.current[i];
        const badge = mobileBadgeRefs.current[i];
        const number = mobileNumberRefs.current[i];
        const text = mobileTextRefs.current[i];

        if (connector) {
          if (reducedMotion) {
            mobileTl.set(connector, { scaleY: 1 });
          } else {
            mobileTl.fromTo(
              connector,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.3, ease: "power2.out" },
              "+=0.05"
            );
          }
        }

        mobileTl.fromTo(
          badge,
          { opacity: 0, scale: 0.4, rotate: -20 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: "back.out(1.9)" },
          reducedMotion ? "+=0" : "-=0.05"
        );

        mobileTl.fromTo(
          number,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.6)" },
          "-=0.15"
        );

        mobileTl.fromTo(
          text,
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.4 },
          "-=0.1"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="why-mask overflow-hidden">
            <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Why Choose Us
            </p>
          </div>

          <h2 className="mt-5 font-heading font-extrabold tracking-tight text-[clamp(1.875rem,4vw,2.75rem)] leading-tight">
            <span className="why-mask overflow-hidden block text-slate-900">
              <span className="inline-block">The team homeowners trust</span>
            </span>
            <span className="why-mask overflow-hidden block">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                for reliable, honest HVAC work.
              </span>
            </span>
          </h2>

          <p className="why-fade mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Four simple reasons customers keep calling One Call HVAC, year after year.
          </p>
        </div>

        {/* Orbit / dial layout — desktop / tablet only */}
        <div className="relative mt-16 mx-auto hidden sm:block w-full max-w-5xl aspect-square sm:aspect-[4/3] lg:aspect-[16/10]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="why-orbit-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="why-spoke-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Faint full dial, always visible */}
            <circle
              className="why-ring-base"
              cx="50"
              cy="50"
              r={RING_R}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.6"
              strokeDasharray="2 3"
            />

            {/* Spokes: technician -> each numbered reason */}
            {positions.map((pos, i) => (
              <line
                key={`spoke-${REASONS[i].number}`}
                ref={(el) => {
                  spokeRefs.current[i] = el;
                }}
                x1={pos.spokeStart.x}
                y1={pos.spokeStart.y}
                x2={pos.cx}
                y2={pos.cy}
                stroke="url(#why-spoke-gradient)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            ))}

            {/* Dial segments: one arc per reason, lights up as that reason reveals */}
            {positions.map((pos, i) => (
              <path
                key={`arc-${REASONS[i].number}`}
                ref={(el) => {
                  arcRefs.current[i] = el;
                }}
                d={pos.arc}
                fill="none"
                stroke="url(#why-orbit-gradient)"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Centered technician — static, sized up */}
          <div
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2
                       h-[74%] w-[74%] sm:h-[60%] sm:w-[60%] lg:h-[56%] lg:w-[56%]
                       flex items-center justify-center"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/25 to-orange-500/25 blur-2xl scale-110" />
              <Image
                src="/man1.png"
                alt="One Call HVAC technician"
                fill
                sizes="(min-width: 1024px) 56vw, (min-width: 640px) 60vw, 74vw"
                className="relative object-contain drop-shadow-[0_20px_30px_rgba(15,23,42,0.25)]"
                priority
              />
            </div>
          </div>

          {/* Reason cards positioned around the dial — bigger, cleaner */}
          {REASONS.map((reason, i) => {
            const pos = positions[i];
            return (
              <div
                key={reason.number}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute z-10 flex w-[260px] max-w-[280px] flex-row items-center gap-3 opacity-0"
                style={{
                  left: `${pos.cx}%`,
                  top: `${pos.cy}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative shrink-0">
                  <div
                    ref={(el) => {
                      badgeRefs.current[i] = el;
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-orange-500 text-white shadow-lg shadow-blue-900/20"
                  >
                    <reason.Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-blue-600 ring-2 ring-blue-100 shadow"
                  >
                    {reason.number}
                  </span>
                </div>

                <div
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="flex-1 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 text-left shadow-md shadow-slate-900/5 transition-shadow hover:shadow-lg"
                >
                  <p className="font-heading font-bold text-base text-slate-900">{reason.title}</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-snug">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical "dial" — technician radiates a connector spoke down
            to each numbered reason, revealed strictly one after another. */}
        <div className="mt-10 flex flex-col items-center sm:hidden">
          {/* Technician + mini dial ring, same visual language as desktop — static, sized up */}
          <div className="relative mb-1 h-48 w-48">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <circle
                ref={mobileRingRef}
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1.6"
                strokeDasharray="3 5"
              />
            </svg>
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500/25 to-orange-500/25 blur-xl scale-110" />
            <Image
              src="/man1.png"
              alt="One Call HVAC technician"
              fill
              sizes="192px"
              className="relative object-contain drop-shadow-[0_14px_20px_rgba(15,23,42,0.25)]"
            />
          </div>

          {/* Vertical spine + one-by-one reason list — bigger, cleaner cards */}
          <div className="relative mx-auto flex w-full max-w-[360px] flex-col items-center">
            {REASONS.map((reason, i) => (
              <div key={`m-${reason.number}`} className="flex w-full flex-col items-center">
                {/* connector spoke from previous stop (technician or prior reason) */}
                <div
                  ref={(el) => {
                    mobileConnectorRefs.current[i] = el;
                  }}
                  className="h-7 w-0.5 origin-top scale-y-0 rounded-full bg-gradient-to-b from-blue-500 to-orange-500"
                  aria-hidden="true"
                />

                <div className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-md shadow-slate-900/5">
                  <div className="relative shrink-0">
                    <div
                      ref={(el) => {
                        mobileBadgeRefs.current[i] = el;
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-orange-500 text-white shadow opacity-0"
                    >
                      <reason.Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span
                      ref={(el) => {
                        mobileNumberRefs.current[i] = el;
                      }}
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-blue-600 ring-2 ring-blue-100 shadow opacity-0"
                    >
                      {reason.number}
                    </span>
                  </div>
                  <div
                    ref={(el) => {
                      mobileTextRefs.current[i] = el;
                    }}
                    className="flex-1 opacity-0"
                  >
                    <p className="font-heading font-bold text-base text-slate-900">{reason.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-snug">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}