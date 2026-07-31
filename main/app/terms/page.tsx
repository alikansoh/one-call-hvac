import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | One Call HVAC",
  description:
    "Terms and conditions for AC repair, installation, and heating services provided by One Call HVAC Ltd.",
};

const LAST_UPDATED = "31 July 2026";

const SECTIONS = [
  {
    heading: "1. Who we are",
    body: [
      "These terms govern any quote, estimate, installation, repair, service, or maintenance work carried out by One Call HVAC Ltd (company registration 16194760), of 5 Ranelagh Road, London SW1V 3EX (\"we\", \"us\", \"our\"). By requesting a quote, accepting an estimate, or instructing us to carry out work, you (\"the customer\") agree to these terms.",
    ],
  },
  {
    heading: "2. Quotes and estimates",
    body: [
      "Quotes are provided free of charge and are valid for 30 days unless stated otherwise. An estimate is our best assessment of the work required based on the information available at the time; the final price may change if the scope of work changes once we're on site (for example, if a fault is more extensive than first apparent).",
      "Any change in price will be discussed with you before further chargeable work is carried out, wherever reasonably possible.",
    ],
  },
  {
    heading: "3. Deposits and payment",
    body: [
      "For larger jobs we may ask for a deposit before work begins. Deposits are offset against the final invoice.",
      "Unless otherwise agreed in writing, invoices are due on receipt, or within 14 days of the invoice date where credit terms have been agreed. Payment is accepted by bank transfer to the account details shown on your invoice.",
      "We reserve the right to charge reasonable interest on invoices paid later than the agreed terms, and to suspend further work until overdue balances are settled.",
    ],
  },
  {
    heading: "4. Guarantees and workmanship",
    body: [
      "Repairs and installations are guaranteed against faulty workmanship for the period stated on your invoice or job sheet. This guarantee does not cover parts fitted by others, pre‑existing faults not part of the agreed scope of work, or damage caused by misuse, neglect, or lack of routine maintenance.",
      "Manufacturer warranties on parts and equipment are passed on to you as provided by the manufacturer and are separate from our own workmanship guarantee.",
    ],
  },
  {
    heading: "5. Access and site conditions",
    body: [
      "You agree to provide safe and reasonable access to the equipment and work area. Where access is restricted, delayed, or unsafe, we may need to reschedule the visit, and additional charges may apply for return visits.",
    ],
  },
  {
    heading: "6. Cancellations",
    body: [
      "You may cancel or reschedule a booked appointment free of charge with at least 24 hours' notice. Cancellations with less notice, or missed appointments where no one is available to grant access, may be subject to a call-out charge.",
    ],
  },
  {
    heading: "7. Liability",
    body: [
      "We carry appropriate insurance for the work we carry out. Our liability for any claim arising from our services is limited to the value of the invoice for the relevant work, except where liability cannot be limited by law (for example, death or personal injury caused by our negligence).",
      "We are not liable for pre-existing faults in a customer's system that are outside the scope of the agreed work, or for consequential losses arising from equipment failure that occurred before we were engaged.",
    ],
  },
  {
    heading: "8. Complaints",
    body: [
      "If you're unhappy with any aspect of our service, please contact us using the details below so we can put it right. We aim to acknowledge complaints within 2 working days.",
    ],
  },
  {
    heading: "9. Governing law",
    body: [
      "These terms are governed by the law of England and Wales, and any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-[100svh] bg-slate-950 overflow-hidden">
      {/* Ambient brand blobs: cool blue upper-left, warm orange lower-right */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-20">
        <p className="font-heading text-xs font-semibold uppercase tracking-widest text-blue-400">
          Legal
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-white leading-[1.05] tracking-tight text-[clamp(2.25rem,6vw,3.25rem)]">
          Terms of{" "}
          <span className="relative inline-block">
            Service
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full" />
          </span>
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated {LAST_UPDATED}</p>

        <p className="mt-8 text-base text-slate-400 leading-relaxed">
          Please read these terms carefully before booking a service or
          accepting a quote from One Call HVAC. They set out what you can
          expect from us, and what we ask of you in return.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section
              key={section.heading}
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-5 py-5 sm:px-6 sm:py-6"
            >
              <h2 className="font-heading font-bold text-white text-lg">
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.body.map((p, i) => (
                  <p key={i} className="text-sm text-slate-400 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-xl bg-white/5 ring-1 ring-white/10 px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="font-heading font-bold text-white text-lg">
              10. Contact us
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              One Call HVAC Ltd, 5 Ranelagh Road, London SW1V 3EX
              <br />
              Phone:{" "}
              <a href="tel:07341314188" className="text-blue-400 hover:text-blue-300">
                07341 314188
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:info@onecallhvac.co.uk"
                className="text-blue-400 hover:text-blue-300"
              >
                info@onecallhvac.co.uk
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}