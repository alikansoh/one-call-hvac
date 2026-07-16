"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wind,
  Layers,
  Boxes,
  SquareStack,
  Network,
  GitBranch,
  Snowflake,
  Fan,
  Phone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  { name: "Mitsubishi", logo: "/mitsubishi.png" },
  { name: "LG", logo: "/lg.webp" },
  { name: "Samsung", logo: "/samsung.webp" },
  { name: "Daikin", logo: "/daikin.webp" },
  { name: "Toshiba", logo: "/toshiba.png" },
  { name: "Hitachi", logo: "/hitachi.webp" },
  { name: "Carrier", logo: "/carrier.webp" },
  { name: "Bosch", logo: "/bosch.webp" },
];

const SYSTEMS: { name: string; description: string; icon: LucideIcon }[] = [
  { name: "Single Split", description: "One indoor unit paired with one outdoor unit — ideal for single rooms.", icon: Wind },
  { name: "Multi Split", description: "Multiple indoor units running from a single outdoor unit.", icon: Layers },
  { name: "Duct Split", description: "Hidden ducted units that distribute air cleanly through ceilings or walls.", icon: Boxes },
  { name: "Cassette Split", description: "Ceiling-mounted 4-way airflow units for even room coverage.", icon: SquareStack },
  { name: "VRF", description: "Variable Refrigerant Flow systems for medium to large commercial spaces.", icon: Network },
  { name: "VRV", description: "Daikin’s VRF-style solution with flexible zoning and energy recovery.", icon: GitBranch },
  { name: "Chiller", description: "Centralised chilled-water plant for large buildings and campuses.", icon: Snowflake },
  { name: "Air Handling Unit", description: "Custom airflow and filtration units for ventilation and climate control.", icon: Fan },
];

export default function BrandsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const brandCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const systemCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const cleanupListeners: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          // ---------------------------------------------------------------
          // Header timeline
          // ---------------------------------------------------------------
          const headerTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          });

          headerTl
            .fromTo(
              ".brands-mask > *",
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
            )
            .fromTo(
              ".brands-fade",
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.6 },
              "-=0.35"
            );

          // ---------------------------------------------------------------
          // Closing CTA reveal (independent trigger — starts off-screen)
          // ---------------------------------------------------------------
          gsap.fromTo(
            ".brands-cta-fade",
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );

          if (reduced) {
            gsap.set([".brand-logo-card", ".system-card", ".brands-cta-fade"], {
              opacity: 1,
              y: 0,
              scale: 1,
              clearProps: "transform",
            });
            return;
          }

          // ---------------------------------------------------------------
          // Brand cards
          // ---------------------------------------------------------------
          gsap.set(".brand-logo-card", { transformPerspective: 800 });
          gsap.fromTo(
            ".brand-logo-card",
            { opacity: 0, y: 24, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: { each: 0.05, from: "start", grid: "auto" },
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".brands-grid",
                start: "top 90%",
                once: true,
              },
            }
          );

          // ---------------------------------------------------------------
          // System cards
          // ---------------------------------------------------------------
          gsap.fromTo(
            ".system-card",
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: { each: 0.06, from: "start", grid: "auto" },
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".systems-grid",
                start: "top 90%",
                once: true,
              },
            }
          );

          // ---------------------------------------------------------------
          // Hover
          // ---------------------------------------------------------------
          const attachHover = (el: HTMLDivElement, opts?: { icon?: boolean }) => {
            const target = opts?.icon
              ? el.querySelector(".system-icon")
              : el.querySelector("img");

            const onEnter = () => {
              gsap.to(el, {
                y: -6,
                scale: 1.03,
                boxShadow: "0 12px 28px -10px rgba(15, 23, 42, 0.16)",
                borderColor: "rgba(37, 99, 235, 0.35)",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
              if (target) {
                gsap.to(target, {
                  scale: 1.06,
                  opacity: 1,
                  color: opts?.icon ? "#2563eb" : undefined,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            };

            const onLeave = () => {
              gsap.to(el, {
                y: 0,
                scale: 1,
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                borderColor: "rgba(226, 232, 240, 1)",
                duration: 0.4,
                ease: "power3.out",
                overwrite: "auto",
              });
              if (target) {
                gsap.to(target, {
                  scale: 1,
                  opacity: opts?.icon ? 1 : 0.85,
                  color: opts?.icon ? "#475569" : undefined,
                  duration: 0.4,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }
            };

            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
            cleanupListeners.push(() => {
              el.removeEventListener("mouseenter", onEnter);
              el.removeEventListener("mouseleave", onLeave);
            });
          };

          brandCardRefs.current.forEach((el) => el && attachHover(el));
          systemCardRefs.current.forEach(
            (el) => el && attachHover(el, { icon: true })
          );
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => {
      cleanupListeners.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="brands-mask overflow-hidden">
              <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Brands We Work With
              </p>
            </div>

            <h2 className="mt-5 font-heading text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              <span className="brands-mask block overflow-hidden">
                <span className="inline-block">
                  Trusted air conditioning brands,
                </span>
              </span>
              <span className="brands-mask block overflow-hidden">
                <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                  installed and serviced with care.
                </span>
              </span>
            </h2>

            <p className="brands-fade mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              We install, repair and maintain systems from every major
              manufacturer — so whatever&apos;s already on your wall, we know
              how to look after it.
            </p>
          </div>

          {/* Brand logos */}
          <div className="brands-grid mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
            {BRANDS.map((brand, i) => (
              <div
                key={brand.name}
                ref={(el) => {
                  brandCardRefs.current[i] = el;
                }}
                className="brand-logo-card group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 shadow-sm will-change-transform sm:h-28"
                style={{ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={48}
                  className="relative z-20 h-auto max-h-10 w-auto max-w-[85%] object-contain sm:max-h-12"
                  style={{ opacity: 0.85 }}
                />
              </div>
            ))}
          </div>

          {/* System types */}
          <div className="mx-auto mt-20 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Systems We Install &amp; Service
            </p>
            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Every configuration, covered.
            </h3>
          </div>

          <div className="systems-grid mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SYSTEMS.map((system, i) => {
              const Icon = system.icon;
              return (
                <div
                  key={system.name}
                  ref={(el) => {
                    systemCardRefs.current[i] = el;
                  }}
                  className="system-card flex flex-col items-center justify-start gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center will-change-transform"
                  style={{ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
                >
                  <Icon
                    className="system-icon h-7 w-7 text-slate-500"
                    strokeWidth={1.75}
                  />
                  <span className="text-sm font-semibold leading-tight text-slate-800">
                    {system.name}
                  </span>
                  <span className="max-w-[95%] text-xs leading-snug text-slate-500">
                    {system.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA banner */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden bg-gradient-to-br from-[#03142b] via-[#0a2647] to-[#03142b] py-16 sm:py-20"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="brands-cta-fade text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Whatever Brand, Whatever System
          </p>
          <h2 className="brands-cta-fade mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight text-white">
            Get your free quote today
          </h2>
          <p className="brands-cta-fade mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            From single splits to full VRF setups, our engineers know every
            major brand and system inside out. Fast, upfront pricing, no
            surprises.
          </p>

          <div className="brands-cta-fade mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
            <Link
              href="/quote"
              className="group flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 px-7 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 transition-all duration-300 hover:brightness-110"
            >
              Get Free Quote
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

            <a
              href="tel:02034885727"
              className="flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <Phone size={17} className="text-white/70" />
              02034885727
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}