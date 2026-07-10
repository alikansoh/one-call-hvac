"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Job = {
  id: string;
  image: string;
  alt: string;
};

// Swap these for real completed-job photos whenever you have them —
// same shape, same field name, drop-in replacement.
const JOBS: Job[] = [
  { id: "job-1", image: "/job-1.jpeg", alt: "Completed HVAC job 1" },
  { id: "job-2", image: "/job-2.jpeg", alt: "Completed HVAC job 2" },
  { id: "job-3", image: "/job-3.jpeg", alt: "Completed HVAC job 3" },
  { id: "job-4", image: "/job-4.jpeg", alt: "Completed HVAC job 4" },
  { id: "job-5", image: "/job-5.jpeg", alt: "Completed HVAC job 5" },
  { id: "job-6", image: "/job-6.jpeg", alt: "Completed HVAC job 6" },
  { id: "job-7", image: "/job-7.jpeg", alt: "Completed HVAC job 7" },
  { id: "job-8", image: "/job-8.jpeg", alt: "Completed HVAC job 8" },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Drag state (mouse-drag on desktop; touch relies on native scroll-snap)
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const movedRef = useRef(false);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < max);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-mask > *",
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
        ".work-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      if (reducedMotion) return;

      gsap.fromTo(
        ".work-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 88%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".work-card");
    const gap = 20;
    const distance = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  // ---- Manual drag-to-scroll (mouse) ----
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    scrollStartRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    el.scrollLeft = scrollStartRef.current - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = false;
    el.classList.remove("cursor-grabbing");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      // no-op: pointer may already be released
    }
  };

  const handleCardClick = (index: number) => {
    // Suppress the click that follows a drag gesture.
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    setLightboxIndex(index);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % JOBS.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + JOBS.length) % JOBS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  // Lock body scroll while the lightbox modal is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lightboxIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient background glow — reinforces the "transparent glass" feel of the cards */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="work-mask overflow-hidden">
              <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Our Work
              </p>
            </div>

            <h2 className="mt-5 font-heading font-extrabold tracking-tight text-[clamp(1.875rem,4vw,2.75rem)] leading-tight">
              <span className="work-mask overflow-hidden block text-slate-900">
                <span className="inline-block">Real jobs, done right,</span>
              </span>
              <span className="work-mask overflow-hidden block">
                <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                  all across London.
                </span>
              </span>
            </h2>

            <p className="work-fade mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              A look at recent installs, repairs, and pipework projects completed
              by our team. Drag to browse, tap any photo to see it up close.
            </p>
          </div>

          {/* Arrow controls — desktop */}
          <div className="work-fade hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-700 shadow-sm backdrop-blur-md transition hover:bg-white disabled:opacity-30 disabled:hover:bg-white/60"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-700 shadow-sm backdrop-blur-md transition hover:bg-white disabled:opacity-30 disabled:hover:bg-white/60"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="relative mt-10 sm:mt-12">
          {/* Edge fades so the crop reads intentional, not clipped */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 to-transparent sm:w-16" />

          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="cursor-grab select-none flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {JOBS.map((job, index) => (
              <button
                key={job.id}
                type="button"
                aria-label={`Open ${job.alt} in full screen`}
                onClick={() => handleCardClick(index)}
                className="work-card group relative aspect-[4/3] w-[90%] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200/70 bg-white/40 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:border-blue-200 hover:shadow-xl sm:w-[58%] lg:w-[38%] xl:w-[30%]"
              >
                <Image
                  src={job.image}
                  alt={job.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 38vw, (min-width: 640px) 58vw, 90vw"
                  className="object-contain transition duration-500 pointer-events-none group-hover:scale-105"
                />
                {/* Subtle sheen on hover, keeps the glass feel without needing text */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/50 text-slate-700 opacity-0 shadow-sm backdrop-blur-md transition duration-300 group-hover:opacity-100">
                  <Expand size={15} />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Arrow controls — mobile, centered under the track */}
        <div className="work-fade mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Scroll left"
            disabled={!canScrollLeft}
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            disabled={!canScrollRight}
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition disabled:opacity-30"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Job photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            ✕
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i - 1 + JOBS.length) % JOBS.length));
            }}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Image wrapper — sized to the viewport, image keeps its natural
              aspect ratio (no cropping) and scales up as large as it can
              fit within the available space. */}
          <div
            className="relative flex h-[85vh] w-full max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={JOBS[lightboxIndex].image}
              alt={JOBS[lightboxIndex].alt}
              fill
              draggable={false}
              className="object-contain rounded-2xl"
              sizes="90vw"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i + 1) % JOBS.length));
            }}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}