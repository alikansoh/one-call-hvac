import type { Metadata } from "next";
import { Phone, ShieldCheck, Clock, BadgePoundSterling } from "lucide-react";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote | Your Company",
  description:
    "Request a free, no-obligation quote for AC repair, installation, or heating service across London. Response within 30 minutes, 24/7.",
};

const REASONS = [
  { Icon: Clock, text: "Response within 30 minutes, 24/7", tone: "blue" as const },
  { Icon: BadgePoundSterling, text: "Upfront pricing, no surprises", tone: "orange" as const },
  { Icon: ShieldCheck, text: "Licensed, insured technicians", tone: "blue" as const },
];

const TONE_CLASSES: Record<"blue" | "orange", string> = {
  blue: "bg-blue-500/10 text-blue-400 ring-blue-400/20",
  orange: "bg-orange-500/10 text-orange-400 ring-orange-400/20",
};

export default function QuotePage() {
  return (
    <main className="relative min-h-[100svh] bg-slate-950 overflow-hidden">
      {/* Ambient brand blobs: cool blue upper-left, warm orange lower-right */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: context (appears second on mobile, first on desktop) */}
          <div className="order-2 lg:order-1 lg:pt-13">
            <h1 className="font-heading font-extrabold text-white leading-[0.95] tracking-tight text-[clamp(2.5rem,7vw,4.25rem)]">
              Get your{" "}
              <span className="relative inline-block">
                free
                <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full" />
              </span>{" "}
              quote
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Tell us what&apos;s going on and a technician will call you back
              shortly. No obligation, no pressure — just an honest price.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {REASONS.map(({ Icon, text, tone }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-3.5 py-2.5 ring-1 ring-white/10"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ${TONE_CLASSES[tone]}`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-semibold text-slate-200">{text}</span>
                </li>
              ))}
            </ul>

            
              <a href="tel:02034885727"
              className="mt-9 inline-flex items-center gap-2 font-heading font-bold text-sm px-6 py-3.5 rounded-md border border-white/15 bg-white/5 text-white shadow-sm hover:border-white/25 hover:bg-white/10 transition-all duration-300"
            >
              <Phone size={17} className="text-slate-400" />
              Or call 02034885727
            </a>
          </div>

          {/* Right: the form (appears first on mobile, second on desktop) */}
          <div className="order-1 lg:order-2 pt-14 lg:pt-10">
            <QuoteForm />
          </div>
        </div>
      </div>
    </main>
  );
}