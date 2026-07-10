"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  PhoneCall,
  Fan,
  Wrench,
  PackageCheck,
  Building2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "installation" | "repair" | "wholesale" | "pipework";

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  Icon: typeof Fan;
  category: Category;
};

const SERVICES: Service[] = [
  {
    slug: "ac-installation",
    title: "AC Installation",
    description:
      "Professional air conditioning installation for homes, offices, shops, and commercial buildings.",
    image: "/service2.png",
    imageAlt: "Professional AC installation at a London property",
    Icon: Fan,
    category: "installation",
  },
  {
    slug: "ac-repair",
    title: "AC Repair",
    description:
      "Fast and reliable repairs for faulty, leaking, noisy, or underperforming air conditioning systems.",
    image: "/service1.png",
    imageAlt: "HVAC technician repairing an air conditioning system",
    Icon: Wrench,
    category: "repair",
  },
  {
    slug: "ac-wholesale",
    title: "AC Wholesale",
    description:
      "High-quality air conditioning units, components, and materials supplied at competitive prices.",
    image: "/images/services/ac-wholesale.jpg",
    imageAlt: "Air conditioning units and HVAC materials ready for wholesale supply",
    Icon: PackageCheck,
    category: "wholesale",
  },
  {
    slug: "ac-pipework",
    title: "AC Pipework",
    description:
      "Reliable refrigerant pipework design and installation for residential, commercial, and large buildings.",
    image: "/images/services/ac-pipework.jpg",
    imageAlt: "Professional AC pipework installation inside a commercial building",
    Icon: Building2,
    category: "pipework",
  },
];

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

export default function Services() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".svc-mask > *, .svc-fade, .svc-card, .svc-card-media img, .svc-cta",
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
        defaults: {
          ease: "power3.out",
        },
      });

      headerTl
        .fromTo(
          ".svc-mask > *",
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.1,
          }
        )
        .fromTo(
          ".svc-divider",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            transformOrigin: "left center",
          },
          "-=0.5"
        )
        .fromTo(
          ".svc-fade",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35"
        );

      ScrollTrigger.batch(".svc-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            }
          );

          batch.forEach((card) => {
            const img = card.querySelector(".svc-card-media img");

            if (img) {
              gsap.fromTo(
                img,
                {
                  scale: 1.08,
                  opacity: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                }
              );
            }
          });
        },
      });

      gsap.fromTo(
        ".svc-cta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
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
    <section ref={rootRef} className="bg-slate-50 py-20 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SERVICE_SCHEMA),
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="svc-mask overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Our Services
            </p>
          </div>

          <span className="svc-divider mt-4 block h-[3px] w-16 rounded-full bg-blue-600" />

          <h2 className="mt-5 font-heading text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-slate-900">
            <span className="svc-mask block overflow-hidden">
              <span className="inline-block">
                Complete AC solutions for every building.
              </span>
            </span>
          </h2>

          <p className="svc-fade mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            From new installations and urgent repairs to wholesale supply and
            building-wide AC pipework, we provide dependable service,
            high-quality materials, and competitive prices.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              aria-label={`View details about our ${service.title} service in London`}
              className="svc-card group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <div className="svc-card-media relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <service.Icon
                  className="h-6 w-6 text-blue-600"
                  strokeWidth={1.8}
                />

                <h3 className="mt-4 font-heading text-lg font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  Learn more
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="svc-cta mt-12 flex flex-col items-start gap-5 rounded-xl border border-slate-200 bg-white px-6 py-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <div>
            <p className="text-sm font-semibold text-slate-800 sm:text-base">
              Need help choosing the right AC service?
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Our team can recommend the best solution for your building and
              budget.
            </p>
          </div>

          <a
            href="tel:+10000000000"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-blue-700 px-5 py-3 font-heading text-sm font-bold text-white transition hover:bg-blue-800"
          >
            <PhoneCall size={16} />
            Call (000) 000-0000
          </a>
        </div>
      </div>
    </section>
  );
}