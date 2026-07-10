"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Snowflake,
  Fan,
  Flame,
  Thermometer,
  Wrench,
  PhoneCall,
  ArrowRight,
  Gauge,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "cool" | "warm" | "both";

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  Icon: typeof Snowflake;
  category: Category;
};

// NOTE: swap `image` paths for your real photography once it's ready —
// drop files in /public/images/services/ using these exact filenames,
// or update the paths below to match yours.
const SERVICES: Service[] = [
  {
    slug: "ac-repair",
    title: "AC Repair",
    description:
      "Same-day diagnostics for every major brand, with most callouts resolved in a single visit.",
    image: "/service1.png",
    imageAlt: "HVAC technician repairing a residential air conditioning unit in London",
    Icon: Snowflake,
    category: "cool",
  },
  {
    slug: "ac-installation",
    title: "AC Installation",
    description:
      "Right-sized, high-efficiency systems installed cleanly and backed by a written warranty.",
    image: "/service2.png",
    imageAlt: "New high-efficiency air conditioning system being installed outside a London home",
    Icon: Fan,
    category: "cool",
  },
  {
    slug: "heating-repair",
    title: "Heating Repair",
    description:
      "Fast, reliable fixes for furnaces, boilers and heat pumps — heat restored before the cold sets back in.",
    image: "/images/services/heating-repair.jpg",
    imageAlt: "Engineer repairing a residential boiler and heating system",
    Icon: Flame,
    category: "warm",
  },
  {
    slug: "heating-installation",
    title: "Heating Installation",
    description:
      "Properly sized heating systems fitted to your home, with efficient running costs built in from day one.",
    image: "/images/services/heating-installation.jpg",
    imageAlt: "Technician installing a new home heating system and boiler unit",
    Icon: Thermometer,
    category: "warm",
  },
  {
    slug: "maintenance-plans",
    title: "Maintenance Plans",
    description:
      "Scheduled tune-ups that catch small issues early and keep manufacturer warranties valid.",
    image: "/images/services/maintenance-plans.jpg",
    imageAlt: "HVAC technician performing routine maintenance on a home cooling and heating system",
    Icon: Wrench,
    category: "both",
  },
  {
    slug: "emergency-service",
    title: "Emergency Service",
    description:
      "Around-the-clock callouts, 365 days a year, with upfront pricing and no overtime surprises.",
    image: "/images/services/emergency-service.jpg",
    imageAlt: "24 hour emergency HVAC technician arriving at a home service call at night",
    Icon: PhoneCall,
    category: "both",
  },
];

const CATEGORY_STYLES: Record<
  Category,
  { badge: string; icon: string; ring: string; link: string; glow: string }
> = {
  cool: {
    badge: "bg-blue-50",
    icon: "text-blue-600",
    ring: "ring-blue-100",
    link: "text-blue-700",
    glow: "from-blue-500/25",
  },
  warm: {
    badge: "bg-orange-50",
    icon: "text-orange-500",
    ring: "ring-orange-100",
    link: "text-orange-600",
    glow: "from-orange-500/25",
  },
  both: {
    badge: "bg-gradient-to-br from-blue-50 to-orange-50",
    icon: "text-slate-700",
    ring: "ring-slate-200",
    link: "text-slate-700",
    glow: "from-slate-500/20",
  },
};

// Structured data helps search engines index each service as a distinct,
// crawlable entity rather than one undifferentiated page — update
// `name`/`telephone`/`url` to match your real business details.
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    areaServed: {
      "@type": "City",
      name: "London",
    },
    provider: {
      "@type": "HVACBusiness",
      name: "Your HVAC Company",
      telephone: "+10000000000",
    },
    url: `https://example.com/services/${service.slug}`,
  })),
};

type TechIconSpec = {
  Icon: typeof Snowflake;
  color: string;
  label: string;
  size: number;
  top: string;
  left: string;
  depth: number;
  floatKeyframe: "svcChipFloatA" | "svcChipFloatB" | "svcChipFloatC";
  duration: string;
  delay: string;
};

// Purely decorative — fills the empty space beside the heading on large
// screens with small "instrument panel" chips rather than dead whitespace.
const TECH_ICONS: TechIconSpec[] = [
  {
    Icon: Fan,
    color: "#2563eb",
    label: "Airflow",
    size: 84,
    top: "2%",
    left: "8%",
    depth: 30,
    floatKeyframe: "svcChipFloatA",
    duration: "7s",
    delay: "0s",
  },
  {
    Icon: Gauge,
    color: "#64748b",
    label: "Pressure",
    size: 64,
    top: "48%",
    left: "48%",
    depth: 10,
    floatKeyframe: "svcChipFloatB",
    duration: "8.5s",
    delay: "0.9s",
  },
  {
    Icon: Thermometer,
    color: "#f97316",
    label: "Temp",
    size: 72,
    top: "58%",
    left: "0%",
    depth: 46,
    floatKeyframe: "svcChipFloatC",
    duration: "7.8s",
    delay: "0.4s",
  },
];

function TechChip({ Icon, color, label, size }: Omit<TechIconSpec, "top" | "left" | "depth" | "floatKeyframe" | "duration" | "delay">) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-1 rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_16px_32px_-14px_rgba(15,23,42,0.3)] backdrop-blur-sm"
      style={{ width: size, height: size }}
    >
      <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-tl-[3px] border-l border-t border-slate-300" />
      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-tr-[3px] border-r border-t border-slate-300" />
      <span className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-bl-[3px] border-b border-l border-slate-300" />
      <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-br-[3px] border-b border-r border-slate-300" />
      <span
        className="absolute inset-3 rounded-xl opacity-25 blur-md"
        style={{ background: color }}
      />
      <Icon className="relative h-[38%] w-[38%]" style={{ color }} strokeWidth={1.7} />
      <span className="relative font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default function Services() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".svc-mask > *, .svc-fade, .svc-card, .svc-card-media img, .svc-tech-chip",
          { clearProps: "all" }
        );
        return;
      }

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      headerTl
        .fromTo(
          ".svc-mask > *",
          { yPercent: 115 },
          { yPercent: 0, duration: 0.8, stagger: 0.1 }
        )
        .fromTo(
          ".svc-divider",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, transformOrigin: "left center" },
          "-=0.5"
        )
        .fromTo(".svc-fade", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .fromTo(
          ".svc-tech-chip",
          { opacity: 0, scale: 0.5, rotate: -14 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.8)" },
          "-=0.3"
        );

      // Batch the cards so each one animates as it individually enters the
      // viewport (cascading down the grid) rather than all firing at once.
      ScrollTrigger.batch(".svc-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
          );
          batch.forEach((card) => {
            const img = card.querySelector(".svc-card-media img");
            const badge = card.querySelector(".svc-badge");
            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.18, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
              );
            }
            if (badge) {
              gsap.fromTo(
                badge,
                { scale: 0, rotate: -12 },
                { scale: 1, rotate: 0, duration: 0.5, delay: 0.25, ease: "back.out(2.2)" }
              );
            }
          });
        },
      });

      gsap.fromTo(
        ".svc-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-cta",
            start: "top 90%",
            once: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-slate-50 py-20 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="max-w-2xl relative z-10">
          <div className="svc-mask overflow-hidden">
            <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Our Services
            </p>
          </div>

          <span className="svc-divider mt-4 block h-[3px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-orange-400" />

          <h2 className="mt-5 font-heading font-extrabold tracking-tight text-[clamp(1.875rem,4vw,2.75rem)] leading-tight">
            <span className="svc-mask overflow-hidden block text-slate-900">
              <span className="inline-block">One team for cooling and heating,</span>
            </span>
            <span className="svc-mask overflow-hidden block">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                done properly.
              </span>
            </span>
          </h2>

          <p className="svc-fade mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From a broken AC in July to a failed boiler in January, our
            licensed London technicians handle it all — with upfront pricing
            and work you won&apos;t need to think about again.
          </p>
        </div>

        {/* Technical instrument-chip cluster — fills the empty space beside
            the heading on large screens instead of leaving dead whitespace. */}
        <div
          className="pointer-events-none absolute right-4 top-0 hidden h-64 w-72 lg:block xl:right-10 xl:w-80"
          style={{ perspective: 1000 }}
          aria-hidden="true"
        >
          {TECH_ICONS.map((chip) => (
            <div
              key={chip.label}
              className="svc-tech-chip svc-chip-float absolute"
              style={
                {
                  top: chip.top,
                  left: chip.left,
                  animation: `${chip.floatKeyframe} ${chip.duration} ease-in-out infinite`,
                  animationDelay: chip.delay,
                } as React.CSSProperties
              }
            >
              <div
                style={{
                  transform: `rotateX(10deg) rotateY(-14deg) translateZ(${chip.depth}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <TechChip Icon={chip.Icon} color={chip.color} label={chip.label} size={chip.size} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service) => {
            const styles = CATEGORY_STYLES[service.category];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                aria-label={`View details about our ${service.title} service in London`}
                className="svc-card group relative flex flex-col rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <div className="svc-card-media relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${styles.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                <div
                  className={`svc-badge relative -mt-6 ml-6 flex h-12 w-12 items-center justify-center rounded-xl ${styles.badge} ring-1 ${styles.ring} shadow-sm`}
                >
                  <service.Icon className={`h-5 w-5 ${styles.icon}`} strokeWidth={2.1} />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${styles.link}`}
                  >
                    View service
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="svc-cta mt-12 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm px-6 py-5 sm:px-8 sm:py-6">
          <p className="text-sm sm:text-base font-semibold text-slate-800">
            Not sure which service you need? We&apos;ll figure it out on the
            phone in two minutes.
          </p>
          <a
            href="tel:+10000000000"
            className="shrink-0 inline-flex items-center gap-2 font-heading font-bold text-sm px-5 py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/20 hover:brightness-110 transition-all duration-300"
          >
            <PhoneCall size={16} className="text-white/80" />
            Call (000) 000-0000
          </a>
        </div>
      </div>

      <style>{`
        @keyframes svcChipFloatA {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes svcChipFloatB {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(9px) rotate(-2deg); }
        }
        @keyframes svcChipFloatC {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-chip-float { animation: none !important; }
        }
      `}</style>
    </section>
  );
}