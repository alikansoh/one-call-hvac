"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

// SEO-targeted: London HVAC / air conditioning installation & maintenance,
// plus one heating question since most AC installers also handle heating.
const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much does air conditioning installation cost in London?",
    answer:
      "Most single-room split system installs in London range from £1,200 to £2,500 fully fitted, depending on unit brand, room size, and pipe run length. Multi-room and multi-split systems typically start from £3,000. We survey your property first and give you a fixed, no-surprises quote before any work begins.",
  },
  {
    id: "faq-2",
    question: "How long does it take to fit an air conditioning unit?",
    answer:
      "A standard single split system is usually installed in 4 to 6 hours by our two-person team. Larger multi-split or ducted systems across several rooms can take 1 to 2 days. We always confirm timing on-site during your survey so you know exactly what to expect.",
  },
  {
    id: "faq-3",
    question: "Do I need planning permission for air conditioning in London?",
    answer:
      "For most domestic properties, external condenser units fall under permitted development and don't need planning permission. Flats, listed buildings, and conservation areas in boroughs like Westminster, Camden, and Kensington & Chelsea sometimes have extra restrictions. We check this for you as part of every survey.",
  },
  {
    id: "faq-4",
    question: "Can the same unit provide both cooling and heating?",
    answer:
      "Yes. Modern reversible heat pump split systems cool your home in summer and heat it efficiently in winter, often at a lower running cost than gas central heating for a single room or extension. If you're weighing up options, we'll walk you through heating-only, cooling-only, and reversible systems so you get the right fit for your home.",
  },
  {
    id: "faq-5",
    question: "How often should an AC unit be serviced?",
    answer:
      "We recommend a full service once a year, ideally in spring before the summer season starts. Regular servicing, filter cleans, refrigerant checks, and coil cleaning keeps units running efficiently, protects your manufacturer warranty, and typically extends the system's lifespan by several years.",
  },
  {
    id: "faq-6",
    question: "Are your engineers F-Gas and Gas Safe certified?",
    answer:
      "Yes. All our engineers hold F-Gas certification for refrigerant handling, and our heating engineers are Gas Safe registered where gas-related work is involved. Every installation is fully compliant with UK building regulations and comes with a workmanship guarantee.",
  },
  {
    id: "faq-7",
    question: "Which areas of London do you cover for AC installation and repair?",
    answer:
      "We install, maintain, and repair air conditioning and heating systems across Greater London, including North, South, East, and West London and the surrounding M25 boroughs. Same-week booking is usually available, with priority slots for breakdowns.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-mask > *",
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
        ".faq-image",
        { opacity: 0, x: reducedMotion ? 0 : -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".faq-row",
        { opacity: 0, y: reducedMotion ? 0 : 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient glow, echoes the brand accent pair used elsewhere on the site */}
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="faq-mask overflow-hidden">
            <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              FAQs
            </p>
          </div>
          <h2 className="mt-5 font-heading font-extrabold tracking-tight text-[clamp(1.875rem,4vw,2.75rem)] leading-tight">
            <span className="faq-mask overflow-hidden block text-slate-900">
              <span className="inline-block">Air conditioning and heating,</span>
            </span>
            <span className="faq-mask overflow-hidden block">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                answered by London engineers.
              </span>
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Image — left column */}
          <div className="faq-image lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200/70 shadow-lg shadow-slate-900/5 lg:sticky lg:top-24">
              <Image
                src="/faqs.jpeg"
                alt="HVAC engineer fitting an air conditioning unit in a London home"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-white">
                  F-Gas &amp; Gas Safe certified engineers
                </p>
                <p className="mt-1 text-xs text-white/80">
                  Cooling and heating installs across Greater London
                </p>
              </div>
            </div>
          </div>

          {/* Accordion — right column */}
          <div className="lg:col-span-7">
            <dl className="divide-y divide-slate-200 border-y border-slate-200">
              {FAQS.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="faq-row py-1">
                    <dt>
                      <button
                        type="button"
                        onClick={() => toggle(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${faq.id}-panel`}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span
                          className={`text-base font-semibold sm:text-lg ${
                            isOpen ? "text-blue-600" : "text-slate-900"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                            isOpen
                              ? "rotate-45 border-blue-200 bg-blue-50 text-blue-600"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <Plus size={16} />
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`${faq.id}-panel`}
                      className="grid overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="min-h-0">
                        <p className="pb-6 pr-10 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}