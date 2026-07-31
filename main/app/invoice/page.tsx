"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { InvoiceItem, InvoicePayload } from "@/lib/types";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

function todayFormatted() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const emptyItem = (): InvoiceItem => ({
  description: "",
  qty: 1,
  rate: 0,
  vatPercent: 0,
});

const currency = (n: number) =>
  n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Field({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2 lg:col-span-4" : ""}>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm transition placeholder:text-stone-400 focus:border-[#2670a8] focus:outline-none focus:ring-2 focus:ring-[#2670a8]/25";

function SectionCard({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
      <div className="mb-5 flex items-baseline gap-3 border-b border-dashed border-stone-200 pb-3">
        <span className="font-mono text-xs tracking-wider text-[#2670a8]">{index}</span>
        <h2 className="text-base font-semibold text-stone-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function InvoicePage() {
  // ---- Sender defaults: One Call HVAC Ltd. (reg: 16194760) ----
  const [senderName, setSenderName] = useState("One Call HVAC Ltd");
  const [senderAddress, setSenderAddress] = useState(
    "5 Ranelagh Road\nLondon SW1V 3EX\nUnited Kingdom\nCompany Reg: 16194760"
  );
  const [senderPhone, setSenderPhone] = useState("07341314188");
  const [senderEmail, setSenderEmail] = useState("onecallhvacuk@gmail.com");
  const [vatRegistered, setVatRegistered] = useState(true);

  const [invoiceNumber, setInvoiceNumber] = useState("INV00098");
  const [invoiceDate, setInvoiceDate] = useState(todayFormatted());
  const [dueDate, setDueDate] = useState(todayFormatted());
  const [terms, setTerms] = useState("Due on Receipt");

  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([{ ...emptyItem(), vatPercent: 20 }]);
  const [deposit, setDeposit] = useState(0);
  const [notes, setNotes] = useState(
    "Please transfer payment in GBP to account: One Call HVAC — A/C: 25666868, Sort Code: 30-54-66. Payment is due 14 days from invoice date."
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(() => {
    const subTotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
    const vatTotal = items.reduce((s, i) => s + i.qty * i.rate * (i.vatPercent / 100), 0);
    const grandTotal = subTotal + vatTotal;
    const balanceDue = grandTotal - (deposit || 0);
    return { subTotal, vatTotal, grandTotal, balanceDue };
  }, [items, deposit]);

  const updateItem = (idx: number, patch: Partial<InvoiceItem>) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  // Ticking "VAT registered" defaults every line item to the UK standard
  // 20% rate; unticking it zero-rates them again.
  const handleVatRegisteredChange = (checked: boolean) => {
    setVatRegistered(checked);
    setItems((prev) => prev.map((it) => ({ ...it, vatPercent: checked ? 20 : 0 })));
  };

  const addItem = () =>
    setItems((prev) => [...prev, { ...emptyItem(), vatPercent: vatRegistered ? 20 : 0 }]);
  const removeItem = (idx: number) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev));

  const handleGenerate = async () => {
    setError(null);
    if (!receiverName.trim()) {
      setError("Please enter the receiver's name.");
      return;
    }
    if (items.some((i) => !i.description.trim())) {
      setError("Every line item needs a description.");
      return;
    }

    setLoading(true);
    try {
      const payload: InvoicePayload = {
        invoiceNumber,
        invoiceDate,
        dueDate,
        terms,
        vatRegistered,
        sender: {
          name: senderName,
          addressLines: senderAddress.split("\n").filter(Boolean),
          phone: senderPhone || undefined,
          email: senderEmail || undefined,
        },
        receiver: {
          name: receiverName,
          addressLines: receiverAddress.split("\n").filter(Boolean),
        },
        items,
        deposit: deposit || undefined,
        notes: notes || undefined,
      };

      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate invoice.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoiceNumber || "invoice"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#f7f4ee] pt-20 sm:pt-24`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-1 border-b border-stone-300 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-[#134a73]">
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <h1
              className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              One Call HVAC — Invoice Generator
            </h1>
          </div>
          <p className="ml-12 text-sm text-stone-500">
            Fill in the customer&apos;s details, add your line items, and download a PDF.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* Main column */}
          <div className="space-y-6">
            <SectionCard index="01" title="Your business">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Business name" wide>
                  <input
                    className={inputClass}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    className={inputClass}
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                  />
                </Field>
                <Field label="Email">
                  <input
                    className={inputClass}
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </Field>
                <Field label="Address" wide>
                  <textarea
                    rows={4}
                    className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                  />
                </Field>
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={vatRegistered}
                  onChange={(e) => handleVatRegisteredChange(e.target.checked)}
                  className="h-4 w-4 rounded border-stone-300 text-[#2670a8] focus:ring-[#2670a8]/40"
                />
                My business is VAT registered
              </label>
            </SectionCard>

            <SectionCard index="02" title="Invoice details">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Invoice #">
                  <input
                    className={`${inputClass} font-mono`}
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </Field>
                <Field label="Invoice date">
                  <input
                    className={`${inputClass} font-mono`}
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Field>
                <Field label="Due date">
                  <input
                    className={`${inputClass} font-mono`}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </Field>
                <Field label="Terms">
                  <input
                    className={inputClass}
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                  />
                </Field>
                <Field label="Less deposit (£)">
                  <input
                    type="number"
                    className={`${inputClass} font-mono`}
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    placeholder="0.00"
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard index="03" title="Bill to">
              <div className="grid grid-cols-1 gap-4">
                <Field label="Receiver name / company">
                  <input
                    className={inputClass}
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="e.g. LSST London Stratford Campus"
                  />
                </Field>
                <Field label="Address">
                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    placeholder={"10 Grove Crescent Road, Stratford\nLondon E15 1BJ"}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard index="04" title="Line items">
              <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-left text-[11px] uppercase tracking-wider text-stone-500">
                      <th className="px-3 py-2.5 font-medium">Description</th>
                      <th className="w-20 px-3 py-2.5 text-right font-medium">Qty</th>
                      <th className="w-28 px-3 py-2.5 text-right font-medium">Rate</th>
                      <th className="w-20 px-3 py-2.5 text-right font-medium">VAT %</th>
                      <th className="w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-stone-100 odd:bg-white even:bg-stone-50/50"
                      >
                        <td className="px-3 py-2">
                          <input
                            className="w-full border-none bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                            value={item.description}
                            onChange={(e) => updateItem(idx, { description: e.target.value })}
                            placeholder="Full service of chiller / AC unit"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            className="w-full border-none bg-transparent text-right font-mono text-sm text-stone-900 outline-none"
                            value={item.qty}
                            onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            className="w-full border-none bg-transparent text-right font-mono text-sm text-stone-900 outline-none"
                            value={item.rate}
                            onChange={(e) => updateItem(idx, { rate: Number(e.target.value) })}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            className="w-full border-none bg-transparent text-right font-mono text-sm text-stone-900 outline-none"
                            value={item.vatPercent}
                            onChange={(e) => updateItem(idx, { vatPercent: Number(e.target.value) })}
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={() => removeItem(idx)}
                            title="Remove row"
                            className="rounded p-1 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={addItem}
                className="mt-3 rounded-md border border-dashed border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-[#2670a8] hover:text-[#134a73]"
              >
                + Add line item
              </button>
            </SectionCard>

            <SectionCard index="05" title="Notes">
              <textarea
                rows={3}
                className={`${inputClass} resize-none`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment details, thank-you note, or anything else the client should know."
              />
            </SectionCard>
          </div>

          {/* Sticky summary sidebar */}
          <div className="lg:sticky lg:top-8">
            <div className="rounded-xl border border-stone-300 bg-[#134a73] p-6 text-stone-100 shadow-lg">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#a9cbe4]">
                {invoiceNumber || "Draft invoice"}
              </p>
              <h3
                className="mt-1 text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Summary
              </h3>

              <dl className="mt-5 space-y-2.5 font-mono text-sm">
                <div className="flex items-center justify-between text-blue-100">
                  <dt>Sub total</dt>
                  <dd>£{currency(totals.subTotal)}</dd>
                </div>
                <div className="flex items-center justify-between text-blue-100">
                  <dt>VAT</dt>
                  <dd>£{currency(totals.vatTotal)}</dd>
                </div>
                {deposit > 0 && (
                  <div className="flex items-center justify-between text-blue-100">
                    <dt>Less deposit</dt>
                    <dd>-£{currency(deposit)}</dd>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between border-t border-double border-t-4 border-[#ff7a2e] pt-3 text-base font-medium text-white">
                  <dt>Balance due</dt>
                  <dd>£{currency(totals.balanceDue)}</dd>
                </div>
              </dl>

              {error && (
                <div className="mt-4 rounded-md border border-red-800 bg-red-950/50 px-3 py-2 text-xs text-red-300">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-5 w-full rounded-md bg-[#ff7a2e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff8a3d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating…" : "Generate PDF invoice"}
              </button>

              <p className="mt-3 text-center text-[11px] text-blue-200/70">
                Terms: {terms || "—"} · Due {dueDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}