"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Users,
  Banknote,
  BadgeCheck,
  PhoneCall,
  ShieldCheck,
  Wind,
  Settings,
  Thermometer,
  Building2,
  Home,
  Clock,
  MapPin,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const COMMITMENTS = [
  "Direct-employed London engineers",
  "Fixed price before work starts",
  "F-Gas certified & insured",
  "All 32 London boroughs covered",
];

const WHY_US = [
  {
    title: "London-wide coverage",
    detail:
      "From Westminster and Kensington to Croydon and Enfield, our engineers cover every one of the 32 London boroughs.",
    Icon: MapPin,
  },
  {
    title: "Certified & insured",
    detail:
      "Every engineer is F-Gas certified, DBS checked and covered by public liability insurance for your peace of mind.",
    Icon: Award,
  },
  {
    title: "Same-day response",
    detail:
      "We aim to respond to emergency breakdowns the same day, and routine enquiries are booked within 24 hours.",
    Icon: Clock,
  },
  {
    title: "Transparent pricing",
    detail:
      "Written fixed quotes before any work begins. If anything changes on site, we call you before we charge.",
    Icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------ */
/* 3D Animation — pure CSS rotating cube                               */
/* ------------------------------------------------------------------ */

function LondonCube() {
  const faces = [
    { icon: Wind, label: "Install", bg: "bg-blue-600" },
    { icon: Settings, label: "Repair", bg: "bg-blue-700" },
    { icon: Thermometer, label: "Service", bg: "bg-blue-800" },
    { icon: Building2, label: "Commercial", bg: "bg-indigo-700" },
    { icon: PhoneCall, label: "24/7 Help", bg: "bg-indigo-800" },
    { icon: Home, label: "Domestic", bg: "bg-blue-500" },
  ];

  return (
    <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 lg:h-96 lg:w-96">
      <style jsx>{`
        .cube-wrap {
          perspective: 1000px;
        }
        .cube {
          width: 140px;
          height: 140px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 14s linear infinite;
        }
        @media (min-width: 640px) {
          .cube {
            width: 170px;
            height: 170px;
          }
        }
        @media (min-width: 1024px) {
          .cube {
            width: 200px;
            height: 200px;
          }
        }
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 18px;
          backface-visibility: visible;
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.25);
        }
        .front  { transform: rotateY(0deg) translateZ(100px); }
        .back   { transform: rotateY(180deg) translateZ(100px); }
        .right  { transform: rotateY(90deg) translateZ(100px); }
        .left   { transform: rotateY(-90deg) translateZ(100px); }
        .top    { transform: rotateX(90deg) translateZ(100px); }
        .bottom { transform: rotateX(-90deg) translateZ(100px); }

        @media (min-width: 640px) {
          .front  { transform: rotateY(0deg) translateZ(120px); }
          .back   { transform: rotateY(180deg) translateZ(120px); }
          .right  { transform: rotateY(90deg) translateZ(120px); }
          .left   { transform: rotateY(-90deg) translateZ(120px); }
          .top    { transform: rotateX(90deg) translateZ(120px); }
          .bottom { transform: rotateX(-90deg) translateZ(120px); }
        }
        @media (min-width: 1024px) {
          .front  { transform: rotateY(0deg) translateZ(145px); }
          .back   { transform: rotateY(180deg) translateZ(145px); }
          .right  { transform: rotateY(90deg) translateZ(145px); }
          .left   { transform: rotateY(-90deg) translateZ(145px); }
          .top    { transform: rotateX(90deg) translateZ(145px); }
          .bottom { transform: rotateX(-90deg) translateZ(145px); }
        }
        @keyframes spin {
          0%   { transform: rotateX(-18deg) rotateY(0deg); }
          100% { transform: rotateX(-18deg) rotateY(360deg); }
        }
      `}</style>

      <div className="cube-wrap">
        <div className="cube">
          {faces.map((face, i) => {
            const Icon = face.icon;
            const className = [
              "face",
              face.bg,
              "text-white",
              i === 0 ? "front" : "",
              i === 1 ? "back" : "",
              i === 2 ? "right" : "",
              i === 3 ? "left" : "",
              i === 4 ? "top" : "",
              i === 5 ? "bottom" : "",
            ].join(" ");
            return (
              <div key={face.label} className={className}>
                <Icon size={36} strokeWidth={1.6} className="mb-2" />
                <span className="text-xs font-bold tracking-wide">{face.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Soft orbit rings */}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/5" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-4 rounded-full border border-white/5" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".abt-mask > *, .abt-fade, .abt-why, .abt-mission-text, .abt-mission-cube",
          { clearProps: "all" }
        );
        return;
      }

      gsap.fromTo(
        ".abt-mask > *",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".abt-fade",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.35 }
      );

      ScrollTrigger.batch(".abt-why", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out" }),
      });

      gsap.fromTo(
        ".abt-mission-text",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".abt-mission-row", start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        ".abt-mission-cube",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".abt-mission-row", start: "top 80%", once: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#03142b] pb-14 pt-20 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="abt-fade mb-5 flex items-center gap-2 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white/80">About Us</span>
          </nav>

          <p className="abt-mask overflow-hidden">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              London Air Conditioning
            </span>
          </p>

          <h1 className="mt-4 max-w-3xl font-heading font-extrabold leading-[1.02] tracking-tight text-white text-[clamp(1.9rem,4.8vw,3.1rem)]">
            <span className="abt-mask block overflow-hidden">
              <span className="inline-block">Air conditioning engineers</span>
            </span>
            <span className="abt-mask block overflow-hidden">
              <span className="inline-block">covering every London borough.</span>
            </span>
          </h1>

          <p className="abt-fade mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            One Call HVAC installs, repairs, services and pipes air conditioning
            throughout London. We keep every engineer on our own books, agree
            every price in writing, and back every job with F-Gas certification
            and public liability cover — from the West End to the M25.
          </p>

          <div className="abt-fade mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:02034885727"
              className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 transition-all duration-300 hover:brightness-110"
            >
              <Phone size={17} />
              Call 02034885727
            </a>
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              See our services
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="abt-fade mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-8">
            {COMMITMENTS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/80 sm:text-sm"
              >
                <Phone size={14} className="shrink-0 text-orange-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are — image + text side by side */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-none rounded-br-[3rem] rounded-tl-[3rem] bg-slate-100 shadow-xl shadow-slate-200 lg:order-1">
              <Image
                src="/about.jpeg"
                alt="One Call HVAC engineers servicing air conditioning in London"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-transparent" />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Who we are</p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                A London air conditioning company built around doing the job properly
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                <p>
                  One Call HVAC covers installation, repair, servicing and pipework
                  for homes, offices and commercial spaces across all 32 London
                  boroughs. We run a tight team of direct-employed engineers so the
                  person quoting your job is the same person carrying it out.
                </p>
                <p>
                  Every engineer is F-Gas certified, DBS checked and backed by full
                  public liability insurance. Every price is agreed in writing before
                  work starts. And every finished system is commissioned with the
                  paperwork filed, whether it is a single wall-mounted unit in a Zone
                  1 flat or a multi-zone commercial fit-out.
                </p>
                <p>
                  No middlemen, no surprise charges, no waiting days for a callback.
                  Just a straightforward London AC service that turns up when it
                  says it will and leaves the system working as it should.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-heading text-2xl font-extrabold text-blue-700">32</p>
                  <p className="text-sm font-medium text-slate-600">London boroughs</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-heading text-2xl font-extrabold text-blue-700">24/7</p>
                  <p className="text-sm font-medium text-slate-600">Emergency response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission — text + 3D animation */}
      <section className="abt-mission-row relative overflow-hidden bg-[#03142b] py-16 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 sm:px-8 lg:flex-row lg:gap-16 xl:gap-24">
          <div className="abt-mission-text flex-1 text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Our mission</p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Set the standard for air conditioning in London —{" "}
              <span className="text-orange-400">one properly done job at a time.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
              Every engineer on the books, every price agreed up front, every job
              certified when it is finished. That is the standard we are building
              the whole business on — from residential split-system installs in
              Westminster to commercial maintenance contracts in Croydon.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 font-heading text-sm font-bold text-[#03142b] transition hover:bg-slate-100"
              >
                Explore our services
                <ArrowRight size={16} />
              </Link>
              <a
                href="tel:02034885727"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3.5 font-heading text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Phone size={17} />
                Call 02034885727
              </a>
            </div>
          </div>

          <div className="abt-mission-cube flex shrink-0 justify-center">
            <LondonCube />
          </div>
        </div>
      </section>

      {/* Why choose us -- replacement section */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Why One Call HVAC
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              The reasons London homes and businesses call us first
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
              Straightforward service, qualified engineers and clear pricing — no matter where in London you are.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="abt-why flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-900/20">
                  <item.Icon size={26} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#03142b] py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Get started</p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Book your London AC survey today
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Call now for a free, no-obligation survey anywhere in London, or leave
            your details and a coordinator will call you back within 30 minutes.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:02034885727"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-orange-900/30 ring-1 ring-white/10 transition-all duration-300 hover:brightness-110"
            >
              <Phone size={17} />
              02034885727
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Request a callback
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-4 text-xs text-white/40">
            Free survey · Fixed written quotes · All London boroughs
          </p>
        </div>
      </section>
    </div>
  );
}