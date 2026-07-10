"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Truck, Wrench, ShieldCheck, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type Step = {
  t: number; // 0–1 position along the road
  title: string;
  description: string;
  Icon: typeof Phone;
};

// Plain, small-shop voice — short enough to sit in a compact card.
const STEPS: Step[] = [
  {
    t: 0.04,
    title: "Give Us a Call",
    description: "Tell us what's going on, we'll get you on the schedule.",
    Icon: Phone,
  },
  {
    t: 0.36,
    title: "We're On Our Way",
    description: "We'll text you when we're headed out.",
    Icon: Truck,
  },
  {
    t: 0.68,
    title: "We Get It Done",
    description: "Install or tune-up, handled in one visit.",
    Icon: Wrench,
  },
  {
    t: 0.96,
    title: "We Stand By It",
    description: "Parts and labor covered, no fine print.",
    Icon: ShieldCheck,
  },
];

// The road is one gentle sine wave, sampled into a polyline. Step markers
// and the van's position are all derived from this same function, so the
// road and everything on it always line up exactly.
const ROAD_W = 1200;
const ROAD_H = 260;
const MID_Y = 150;
const AMPLITUDE = 68;
const SAMPLE_POINTS = 120;

function roadY(t: number) {
  return MID_Y + AMPLITUDE * Math.sin(t * Math.PI * 2 - Math.PI / 2);
}

function buildRoadPath() {
  let d = "";
  for (let i = 0; i <= SAMPLE_POINTS; i++) {
    const t = i / SAMPLE_POINTS;
    const x = t * ROAD_W;
    const y = roadY(t);
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const ROAD_D = buildRoadPath();

// ---- Mobile route -----------------------------------------------------
// Small screens get their own vertical "map route" instead of the wide
// sine-wave road — same van, same idea, just laid out top-to-bottom so it
// fits a phone. Steps alternate left/right; a Catmull-Rom spline threads a
// smooth road through each one so it still feels like one continuous route.
const M_ROAD_W = 320;
const M_STEP_GAP = 172;
const M_MARGIN = 60;
const M_ROAD_H = M_MARGIN * 2 + M_STEP_GAP * (STEPS.length - 1);
const M_LEFT_X = M_ROAD_W * 0.3;
const M_RIGHT_X = M_ROAD_W * 0.7;

const M_ANCHORS = STEPS.map((_, i) => ({
  x: i % 2 === 0 ? M_LEFT_X : M_RIGHT_X,
  y: M_MARGIN + i * M_STEP_GAP,
}));

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

const M_ROAD_D = buildSmoothPath([
  { x: M_ANCHORS[0].x, y: 0 },
  ...M_ANCHORS,
  { x: M_ANCHORS[M_ANCHORS.length - 1].x, y: M_ROAD_H },
]);

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vanOuterRef = useRef<HTMLDivElement>(null);
  const vanBounceRef = useRef<HTMLDivElement>(null);
  const traveledRef = useRef<SVGPathElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Mobile road refs
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const mVanOuterRef = useRef<HTMLDivElement>(null);
  const mVanBounceRef = useRef<HTMLDivElement>(null);
  const mTraveledRef = useRef<SVGPathElement>(null);
  const mStepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-mask > *",
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
        ".proc-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      if (reducedMotion) {
        // Reduced motion: no path-driven van on either layout. Just a calm
        // batch fade-in for whichever simple/step markers are visible.
        ScrollTrigger.batch(".process-step-mobile, .process-step-mobile-road", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }
            ),
        });
        return;
      }

      // ---------------- Desktop: pinned sine-wave road ----------------
      if (isDesktop) {
        const totalLen = traveledRef.current?.getTotalLength() ?? 0;
        gsap.set(traveledRef.current, { strokeDasharray: totalLen, strokeDashoffset: totalLen });

        stepRefs.current.forEach((el) => {
          gsap.set(el, { opacity: 0.42, scale: 0.92 });
          const check = el?.querySelector(".process-check");
          if (check) gsap.set(check, { scale: 0, opacity: 0 });
        });

        // Gentle suspension bounce, independent of scroll position.
        gsap.to(vanBounceRef.current, {
          y: 5,
          duration: 0.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const proxy = { t: 0 };
        const applyVan = () => {
          const t = proxy.t;
          const xPct = t * 100;
          const yPct = (roadY(t) / ROAD_H) * 100;
          const eps = 0.01;
          const y1 = roadY(Math.max(0, t - eps));
          const y2 = roadY(Math.min(1, t + eps));
          const angle = Math.atan2(y2 - y1, 2 * eps * ROAD_W) * (180 / Math.PI);
          const clamped = Math.max(-14, Math.min(14, angle));
          gsap.set(vanOuterRef.current, { left: `${xPct}%`, top: `${yPct}%`, rotate: clamped });
        };
        applyVan();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=220%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(proxy, { t: 1, duration: 1, ease: "none", onUpdate: applyVan }, 0);
        tl.to(traveledRef.current, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);

        STEPS.forEach((step, i) => {
          const el = stepRefs.current[i];
          const check = el?.querySelector(".process-check");
          tl.to(el, { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, Math.max(0, step.t - 0.03));
          if (check) {
            tl.to(check, { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(2.4)" }, step.t);
          }
        });

        return;
      }

      // ---------------- Mobile / tablet: winding vertical road ----------------
      const mTotalLen = mTraveledRef.current?.getTotalLength() ?? 0;
      gsap.set(mTraveledRef.current, { strokeDasharray: mTotalLen, strokeDashoffset: mTotalLen });

      mStepRefs.current.forEach((el) => {
        gsap.set(el, { opacity: 0.45, scale: 0.92 });
        const check = el?.querySelector(".process-check");
        if (check) gsap.set(check, { scale: 0, opacity: 0 });
      });

      gsap.to(mVanBounceRef.current, {
        y: 4,
        duration: 0.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const mProxy = { t: 0 };
      const applyMobileVan = () => {
        const path = mTraveledRef.current;
        if (!path || mTotalLen === 0) return;
        const t = mProxy.t;
        const len = t * mTotalLen;
        const eps = Math.max(1, mTotalLen * 0.01);
        const p = path.getPointAtLength(len);
        const p1 = path.getPointAtLength(Math.max(0, len - eps));
        const p2 = path.getPointAtLength(Math.min(mTotalLen, len + eps));
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        // Heading angle for a right-facing van image: atan2(dy, dx) in
        // degrees. On this mostly top-to-bottom road that resolves to
        // ~90deg (nose down) automatically, leaning a few degrees either
        // way on curves. Clamped so it never looks sideways/backwards.
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const clamped = Math.max(55, Math.min(125, angle));
        const xPct = (p.x / M_ROAD_W) * 100;
        const yPct = (p.y / M_ROAD_H) * 100;
        gsap.set(mVanOuterRef.current, { left: `${xPct}%`, top: `${yPct}%`, rotate: clamped });
      };
      applyMobileVan();

      const lastCardEl = mStepRefs.current[STEPS.length - 1] ?? mobileSectionRef.current;

      const mtl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileSectionRef.current,
          start: "top bottom",
          // Ends when the LAST CARD (not the whole road container) hits
          // the vertical center of the viewport. The container renders
          // taller than most phone screens, so ending at "container
          // bottom hits viewport top" meant t=1 only arrived once the
          // last card had shrunk to a sliver at the very top edge — the
          // van technically finished, but you'd never see it happen.
          // This requires *less* scrolling than that old end point, so
          // it's still always reachable no matter what follows on the page.
          endTrigger: lastCardEl,
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      mtl.to(mProxy, { t: 1, duration: 1, ease: "none", onUpdate: applyMobileVan }, 0);
      mtl.to(mTraveledRef.current, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);

      STEPS.forEach((step, i) => {
        const el = mStepRefs.current[i];
        const check = el?.querySelector(".process-check");
        const stepT = M_ANCHORS[i].y / M_ROAD_H;
        mtl.to(el, { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, Math.max(0, stepT - 0.03));
        if (check) {
          mtl.to(check, { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(2.4)" }, stepT);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="max-w-2xl">
          <div className="proc-mask overflow-hidden">
            <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              How It Works
            </p>
          </div>

          <h2 className="mt-5 font-heading font-extrabold tracking-tight text-[clamp(1.875rem,4vw,2.75rem)] leading-tight">
            <span className="proc-mask overflow-hidden block text-slate-900">
              <span className="inline-block">From free quote to reliable cooling,</span>
            </span>
            <span className="proc-mask overflow-hidden block">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                done right every time.
              </span>
            </span>
          </h2>

          <p className="proc-fade mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            No overbooked crews, no guesswork. Here&apos;s exactly what happens
            between requesting AC installation or maintenance and enjoying a
            cooling system that actually works when you need it.
          </p>
        </div>

        {/* Desktop: the van drives the road as you scroll */}
        <div className="relative mt-16 hidden lg:block">
          <div className="relative w-full aspect-[1200/260]">
            <svg
              viewBox={`0 0 ${ROAD_W} ${ROAD_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="process-road-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>

              <path
                d={ROAD_D}
                stroke="#e2e8f0"
                strokeWidth={14}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={traveledRef}
                d={ROAD_D}
                stroke="url(#process-road-gradient)"
                strokeWidth={14}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={ROAD_D}
                stroke="#ffffff"
                strokeWidth={2.5}
                strokeDasharray="16 14"
                fill="none"
                strokeLinecap="round"
                opacity={0.9}
              />
            </svg>

            {STEPS.map((step, i) => {
              const x = step.t * 100;
              const y = (roadY(step.t) / ROAD_H) * 100;
              return (
                <div
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="absolute z-20 flex flex-col items-center"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white ring-2 ring-slate-200 shadow-lg">
                    <step.Icon className="h-5 w-5 text-slate-700" strokeWidth={2} />
                    <span className="process-check absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-orange-500 text-white shadow">
                      <Check size={11} strokeWidth={3} />
                    </span>
                  </div>
                  <div className="mt-2.5 w-36 rounded-lg bg-white/95 px-2 py-1.5 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-heading font-bold text-sm text-slate-900">{step.title}</p>
                    <p className="mt-1 text-xs font-medium text-slate-600 leading-snug">{step.description}</p>
                  </div>
                </div>
              );
            })}

            <div
              ref={vanOuterRef}
              className="absolute z-10"
              style={{ width: 200, transform: "translate(-50%, -50%)" }}
            >
              <div ref={vanBounceRef}>
                <Image
                  src="/van.png"
                  alt="One Call HVAC branded service van"
                  width={1536}
                  height={1024}
                  className="h-auto w-full drop-shadow-[0_18px_28px_rgba(15,23,42,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: winding vertical road, van animates on scroll */}
        <div
          ref={mobileSectionRef}
          className="relative mt-12 flex flex-col lg:hidden motion-reduce:hidden"
        >
          <div
            className="relative mx-auto w-full max-w-md"
            style={{ aspectRatio: `${M_ROAD_W} / ${M_ROAD_H}` }}
          >
            <svg
              viewBox={`0 0 ${M_ROAD_W} ${M_ROAD_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="process-road-gradient-mobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>

              <path
                d={M_ROAD_D}
                stroke="#e2e8f0"
                strokeWidth={10}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={mTraveledRef}
                d={M_ROAD_D}
                stroke="url(#process-road-gradient-mobile)"
                strokeWidth={10}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={M_ROAD_D}
                stroke="#ffffff"
                strokeWidth={2}
                strokeDasharray="12 10"
                fill="none"
                strokeLinecap="round"
                opacity={0.9}
              />
            </svg>

            {STEPS.map((step, i) => {
              const anchor = M_ANCHORS[i];
              const xPct = (anchor.x / M_ROAD_W) * 100;
              const yPct = (anchor.y / M_ROAD_H) * 100;
              return (
                <div
                  key={step.title}
                  ref={(el) => {
                    mStepRefs.current[i] = el;
                  }}
                  className="process-step-mobile-road absolute z-20 flex flex-col items-center"
                  style={{ left: `${xPct}%`, top: `${yPct}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white ring-2 ring-slate-200 shadow-lg">
                    <step.Icon className="h-4 w-4 text-slate-700" strokeWidth={2} />
                    <span className="process-check absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-orange-500 text-white shadow">
                      <Check size={9} strokeWidth={3} />
                    </span>
                  </div>
                  <div className="mt-2 w-28 rounded-md bg-white/95 px-1.5 py-1 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-heading font-bold text-[11px] text-slate-900">{step.title}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-600 leading-snug">{step.description}</p>
                  </div>
                </div>
              );
            })}

            <div
              ref={mVanOuterRef}
              className="absolute z-10"
              style={{ width: 92, transform: "translate(-50%, -50%)" }}
            >
              <div ref={mVanBounceRef}>
                <Image
                  src="/van.png"
                  alt="One Call HVAC branded service van"
                  width={1536}
                  height={1024}
                  className="h-auto w-full drop-shadow-[0_10px_16px_rgba(15,23,42,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reduced motion fallback: simple static vertical timeline, no van */}
        <div className="mt-12 hidden flex-col gap-8 motion-reduce:flex lg:motion-reduce:hidden">
          {STEPS.map((step, i) => (
            <div key={step.title} className="process-step-mobile flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-2 ring-blue-500 shadow-sm">
                  <step.Icon className="h-4 w-4 text-blue-600" strokeWidth={2.2} />
                </div>
                {i < STEPS.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-gradient-to-b from-blue-400 to-orange-300" />
                )}
              </div>
              <div className="pb-2">
                <p className="font-heading font-bold text-base text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}