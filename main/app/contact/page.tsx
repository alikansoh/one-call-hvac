"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  Headphones,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const SERVICE_OPTIONS = [
  "Installation",
  "Repair / Breakdown",
  "Annual Service",
  "Pipework",
  "Commercial maintenance",
  "Home / Residential",
  "Not sure — need advice",
];

const CONTACT_CARDS = [
  {
    Icon: Phone,
    title: "Call us directly",
    detail: "0203 488 5727",
    sub: "Speak to a coordinator now",
    href: "tel:02034885727",
  },
  {
    Icon: Mail,
    title: "Email us",
    detail: "onecallhvacuk@gmail.com",
    sub: "We reply within 2 working hours",
    href: "mailto:onecallhvacuk@gmail.com",
  },
  {
    Icon: Clock,
    title: "Working hours",
    detail: "Mon–Sat: 8am – 6pm",
    sub: "24/7 emergency line open",
    href: "tel:02034885727",
  },
  {
    Icon: MapPin,
    title: "Coverage",
    detail: "All 32 London boroughs",
    sub: "From Westminster to Enfield",
    href: "/services",
  },
];

const TRUST_POINTS = [
  "Free, no-obligation surveys",
  "Fixed written quotes",
  "F-Gas certified engineers",
  "Public liability insured",
];

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function ContactPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".cnt-mask > *, .cnt-fade, .cnt-card, .cnt-form, .cnt-map",
          { clearProps: "all" }
        );
        return;
      }

      gsap.fromTo(
        ".cnt-mask > *",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        ".cnt-fade",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.35 }
      );

      ScrollTrigger.batch(".cnt-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          ),
      });

      gsap.fromTo(
        ".cnt-form",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cnt-form-row", start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        ".cnt-map",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cnt-form-row", start: "top 80%", once: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    // Replace this with your real API call (Resend, Nodemailer, HubSpot, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setBusy(false);
    setSubmitted(true);
  };

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#03142b] pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="cnt-fade mb-5 flex items-center gap-2 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white/80">Contact Us</span>
          </nav>

          <p className="cnt-mask overflow-hidden">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Get in touch
            </span>
          </p>

          <h1 className="mt-4 max-w-3xl font-heading font-extrabold leading-[1.02] tracking-tight text-white text-[clamp(1.9rem,4.8vw,3.4rem)]">
            <span className="cnt-mask block overflow-hidden">
              <span className="inline-block">Book a free survey</span>
            </span>
            <span className="cnt-mask block overflow-hidden">
              <span className="inline-block">or request a callback.</span>
            </span>
          </h1>

          <p className="cnt-fade mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Call us now for a same-day response, or fill in the form and a London
            coordinator will call you back within 30 minutes during working hours.
          </p>

          <div className="cnt-fade mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:02034885727"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 px-7 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 transition-all duration-300 hover:brightness-110"
            >
              <Phone size={17} />
              0203 488 5727
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Fill in the form
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="relative z-10 -mt-8 pb-4 sm:-mt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="cnt-card group rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-900/20 transition-transform duration-300 group-hover:scale-105">
                  <card.Icon size={22} />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  {card.title}
                </p>
                <p className="mt-1 font-heading text-lg font-extrabold text-slate-900">
                  {card.detail}
                </p>
                <p className="mt-1 text-sm text-slate-600">{card.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section id="contact-form" className="cnt-form-row py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Form */}
            <div className="cnt-form lg:col-span-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8 lg:p-10">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
                    <Headphones size={22} />
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
                      Send us a message
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 sm:text-base">
                      Tell us about your property, system and what you need. We will
                      reply by phone or email within 30 minutes.
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="mt-10 rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
                    <h3 className="mt-4 font-heading text-xl font-bold text-green-900">
                      Thanks — we have received your message
                    </h3>
                    <p className="mt-2 text-green-800">
                      A coordinator will call you on{" "}
                      <span className="font-semibold">{form.phone || "the number provided"}</span>{" "}
                      shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          postcode: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="mt-6 text-sm font-bold text-green-700 underline underline-offset-4 hover:text-green-900"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Full name <span className="text-orange-600">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Phone number <span className="text-orange-600">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="020 3488 5727"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Email address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="postcode" className="mb-1.5 block text-sm font-semibold text-slate-700">
                          London postcode <span className="text-orange-600">*</span>
                        </label>
                        <input
                          id="postcode"
                          name="postcode"
                          type="text"
                          required
                          value={form.postcode}
                          onChange={handleChange}
                          placeholder="SW1A 1AA"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        What do you need help with? <span className="text-orange-600">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about the property, the number of rooms, preferred dates or any current faults..."
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-slate-500">
                        By submitting this form you agree to be contacted about your enquiry.
                      </p>
                      <button
                        type="submit"
                        disabled={busy}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-blue-900/30 transition-all duration-300 hover:brightness-110 disabled:opacity-70 sm:w-auto"
                      >
                        {busy ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            Request a callback
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar: address map + trust */}
            <div className="cnt-map flex flex-col gap-6 lg:col-span-2">
              {/* Map */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-md shadow-slate-200/60">
                <div className="relative aspect-[4/3] w-full bg-slate-200">
                  <iframe
                    title="One Call HVAC Ltd - 5 Ranelagh Road, London SW1V 3EX"
                    src="https://www.google.com/maps?q=5+Ranelagh+Road%2C+SW1V+3EX&z=15&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <p className="font-heading text-base font-bold text-slate-900">
                    5 Ranelagh Road, London SW1V 3EX
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    One Call HVAC Ltd. We cover all 32 London boroughs.
                  </p>
                </div>
              </div>

              {/* Trust box */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/60">
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Why customers trust us
                </h3>
                <ul className="mt-4 space-y-3">
                  {TRUST_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-600" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700">
                    <BadgeCheck size={16} className="text-blue-600" />
                    F-Gas certified
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700">
                    <ShieldCheck size={16} className="text-blue-600" />
                    Fully insured
                  </div>
                </div>
              </div>

              {/* Direct call card */}
              <div className="rounded-3xl bg-[#03142b] p-6 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Need help now?
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Our 24/7 emergency line is open for breakdowns and urgent repairs.
                </p>
                <a
                  href="tel:02034885727"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-orange-900/30 transition-all duration-300 hover:brightness-110"
                >
                  <Phone size={17} />
                  Call 0203 488 5727
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registered details */}
      <section className="bg-slate-50 py-8 text-center">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs leading-relaxed text-slate-500">
            ONE CALL HVAC LTD · Registered in England & Wales: 16194760 · VAT Registration number: 486084166
            <br />
            Registered address: 5 Ranelagh Road, London SW1V 3EX · onecallhvacuk@gmail.com
          </p>
        </div>
      </section>

      {/* Final reassurance strip */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:flex-row sm:p-8 lg:p-10">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-slate-900 sm:text-2xl">
                Prefer to talk it through?
              </h2>
              <p className="mt-1 max-w-lg text-sm text-slate-600 sm:text-base">
                A real coordinator will answer your questions and book a free survey
                at a time that suits you.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-heading text-sm font-bold text-slate-900 transition hover:border-slate-400 hover:bg-white"
            >
              Learn more about us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}