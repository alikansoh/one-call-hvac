import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | One Call HVAC",
  description:
    "How One Call HVAC Ltd collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "31 July 2026";

const SECTIONS = [
  {
    heading: "1. Who we are",
    body: [
      "One Call HVAC Ltd (company registration 16194760), of 5 Ranelagh Road, London SW1V 3EX, is the data controller for the personal information described in this policy. This policy explains what we collect, why, and what rights you have over it.",
    ],
  },
  {
    heading: "2. Information we collect",
    body: [
      "When you request a quote, book a service, or contact us, we may collect your name, phone number, email address, service address, and details of the fault or work requested.",
      "When we invoice you, we also hold billing details such as your billing name and address. We do not collect or store full payment card details — bank transfers are made directly to our account.",
      "If you contact us by phone or email, we may keep a record of that correspondence to help resolve your enquiry and for training purposes.",
    ],
  },
  {
    heading: "3. How we use your information",
    body: [
      "We use your information to: respond to quote requests; schedule and carry out repair, installation, and maintenance work; issue invoices and process payments; contact you about an ongoing or upcoming job; and meet our legal and accounting obligations (for example, keeping invoice records for tax purposes).",
      "We do not use your information for automated decision-making, and we do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "4. Who we share it with",
    body: [
      "We may share your information with technicians , our accountant or bookkeeper for invoicing purposes, and our bank for processing payments. We only share what's necessary for them to do their job, and we expect anyone we share data with to keep it secure.",
      "We may also disclose information where required by law, for example to HMRC or a regulator.",
    ],
  },
  {
    heading: "5. How long we keep it",
    body: [
      "We keep customer and job records for as long as needed to provide our services and honour any workmanship guarantee, and invoice records for at least 6 years to meet UK tax record-keeping requirements. After that, information is securely deleted or anonymised.",
    ],
  },
  {
    heading: "6. Your rights",
    body: [
      "Under UK data protection law, you have the right to ask us for a copy of the personal information we hold about you, to correct inaccurate information, to ask us to delete it (subject to our legal obligations, such as tax records), and to object to or restrict certain uses of your data.",
      "To exercise any of these rights, contact us using the details below. If you're unhappy with how we've handled your information, you also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk.",
    ],
  },
  {
    heading: "7. Website and cookies",
    body: [
      "If our website uses cookies or similar technologies (for example, to remember your quote form progress or measure site traffic), we'll only use those that are strictly necessary or that you've consented to.",
    ],
  },
  {
    heading: "8. Keeping your data safe",
    body: [
      "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-[100svh] bg-slate-950 overflow-hidden">
      {/* Ambient brand blobs: cool blue upper-left, warm orange lower-right */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-20">
        <p className="font-heading text-xs font-semibold uppercase tracking-widest text-orange-400">
          Legal
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-white leading-[1.05] tracking-tight text-[clamp(2.25rem,6vw,3.25rem)]">
          Privacy{" "}
          <span className="relative inline-block">
            Policy
            <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-orange-400 to-blue-400 rounded-full" />
          </span>
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated {LAST_UPDATED}</p>

        <p className="mt-8 text-base text-slate-400 leading-relaxed">
          Your privacy matters to us. This policy explains what personal
          information One Call HVAC collects when you get a quote or book a
          job with us, and how we look after it.
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
              9. Contact us
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              One Call HVAC Ltd, 5 Ranelagh Road, London SW1V 3EX
              <br />
              Phone:{" "}
              <a href="tel:07341314188" className="text-orange-400 hover:text-orange-300">
                07341 314188
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:info@onecallhvac.co.uk"
                className="text-orange-400 hover:text-orange-300"
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