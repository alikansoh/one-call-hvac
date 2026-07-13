"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  Icon: typeof Clock;
};

const STATS: Stat[] = [
  { id: "years", value: 15, suffix: "+", label: "Years in business", Icon: Clock },
  { id: "jobs", value: 8600, suffix: "+", label: "Jobs completed", Icon: ShieldCheck },
  { id: "clients", value: 4200, suffix: "+", label: "Happy customers", Icon: Users },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-mask > *",
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
        ".about-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        ".about-image",
        { opacity: 0, x: reducedMotion ? 0 : -28, scale: reducedMotion ? 1 : 1.04 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".about-badge",
        { opacity: 0, y: reducedMotion ? 0 : 18, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".about-stat-card",
        { opacity: 0, y: reducedMotion ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 85%", once: true },
        }
      );

      // Count-up for each stat, triggered once the stats row enters view
      STATS.forEach((stat, i) => {
        const el = statRefs.current[i];
        if (!el) return;

        if (reducedMotion) {
          el.textContent = `${stat.value.toLocaleString()}${stat.suffix}`;
          return;
        }

        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val).toLocaleString()}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Ambient glow, echoes the brand accent pair used elsewhere on the site */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Image — left column */}
          <div className="about-image lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200/70 shadow-lg shadow-slate-900/5">
              <Image
                src="/about-us.jpeg"
                alt="One Call HVAC engineers servicing an air conditioning unit"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="about-badge absolute -bottom-6 -right-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 sm:-right-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-orange-500 text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-slate-900">
                      F-Gas &amp; Gas Safe
                    </p>
                    <p className="text-xs text-slate-500">Certified engineers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy — right column */}
          <div className="lg:col-span-7 lg:pl-4">
            <div className="about-mask overflow-hidden">
              <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                About Us
              </p>
            </div>

            <h2 className="mt-5 font-heading font-extrabold tracking-tight text-[clamp(1.875rem,4vw,2.75rem)] leading-tight">
              <span className="about-mask overflow-hidden block text-slate-900">
                <span className="inline-block">A local team you can</span>
              </span>
              <span className="about-mask overflow-hidden block">
                <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                  actually rely on.
                </span>
              </span>
            </h2>

            <p className="about-fade mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              For over 15 years, we&apos;ve been keeping London homes and
              businesses comfortable all year round. No call centres, no
              subcontractors passed from job to job — just qualified,
              background-checked engineers who show up on time and do it
              right the first time.
            </p>

            <p className="about-fade mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              From single-room split systems to full commercial installs, we
              treat every property like it&apos;s our own — with fixed
              pricing, honest advice, and a workmanship guarantee behind
              every job.
            </p>

            <div className="about-fade mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-heading font-bold text-sm px-6 py-3.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300"
              >
                More About Us
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Stats row */}
            <div className="about-stats mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS.map((stat, i) => (
                <div
                  key={stat.id}
                  className="about-stat-card rounded-xl border border-slate-200 bg-slate-50/60 p-5"
                >
                  <stat.Icon className="h-5 w-5 text-blue-600" strokeWidth={2.25} />
                  <p className="mt-3 font-heading text-2xl font-extrabold text-slate-900 tabular-nums sm:text-3xl">
                    <span
                      ref={(el) => {
                        statRefs.current[i] = el;
                      }}
                    >
                      0
                    </span>
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}