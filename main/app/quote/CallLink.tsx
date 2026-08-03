// app/quote/CallLink.tsx
"use client";

import { Phone } from "lucide-react";
import { trackConversion } from "@/lib/gtag";

// Replace with the label from your "Phone call" conversion action
const PHONE_CONVERSION_LABEL = "02034885727";

export default function CallLink() {
  return (
    <a
      href="tel:02034885727"
      onClick={() => trackConversion(PHONE_CONVERSION_LABEL)}
      className="mt-9 inline-flex items-center gap-2 font-heading font-bold text-sm px-6 py-3.5 rounded-md border border-white/15 bg-white/5 text-white shadow-sm hover:border-white/25 hover:bg-white/10 transition-all duration-300"
    >
      <Phone size={17} className="text-slate-400" />
      Or call 02034885727
    </a>
  );
}