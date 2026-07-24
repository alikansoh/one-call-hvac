"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { User, Phone, Mail, Wrench, MapPin, ArrowRight, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "AC Repair",
    postcode: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: form.name,
          user_phone: form.phone,
          user_email: form.email,
          service_type: form.service,
          postcode: form.postcode,
          message: form.message,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong sending your request. Please try again or call us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-8 text-center">
        <p className="font-heading font-bold text-lg text-blue-900">Thanks — we got it!</p>
        <p className="mt-2 text-sm text-gray-600">
          A technician will call you back within 30 minutes.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-colors";
  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-600";

  return (
    <div className="w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-7">
      <div className="mb-5">
        <p className="font-heading font-bold text-blue-900 text-xl leading-tight">
          Get a Free Quote
        </p>
        <p className="text-xs text-gray-500 mt-1">Response within 30 minutes, 24/7.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="qf-name" className={labelClass}>
            Full name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="qf-name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Smith"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="qf-phone" className={labelClass}>
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="qf-phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="02034885727"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="qf-email" className={labelClass}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="qf-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="qf-service" className={labelClass}>
            Service needed
          </label>
          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              id="qf-service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className={`${inputClass} appearance-none bg-white`}
            >
              <option>AC Repair</option>
              <option>AC Installation</option>
              <option>Heating Repair</option>
              <option>Maintenance</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="qf-postcode" className={labelClass}>
            Postcode
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="qf-postcode"
              type="text"
              autoComplete="postal-code"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              placeholder="e.g. SW1A 1AA"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="qf-message" className={labelClass}>
            Message <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="qf-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us what's going on"
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-colors"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 ring-1 ring-red-200 rounded-lg px-3 py-2.5">
            <AlertCircle size={14} className="shrink-0" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="group mt-1 flex items-center justify-center gap-2 font-heading font-bold text-sm px-5 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md shadow-blue-900/25 ring-1 ring-white/10 hover:brightness-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get Free Quote
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="text-[11px] text-gray-400 text-center">
          <span className="text-red-500">*</span> Required · No spam, we respect your privacy.
        </p>
      </form>
    </div>
  );
}