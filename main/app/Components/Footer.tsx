"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "AC Installation",
  "AC Repair & Maintenance",
  "Heating Installation",
  "Heat Pump Systems",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-50 border-t border-slate-200">
      {/* Ambient glow, echoes the brand accent pair used elsewhere on the site */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 pt-16 pb-8 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/logo.png"
              alt="One Call HVAC - Heating and Cooling Services in London"
              width={340}
              height={120}
              className="h-16 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-600">
              Trusted heating and cooling specialists serving homes and
              businesses across Greater London. Same-day service, upfront
              pricing, no surprises.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors duration-300 hover:border-blue-300 hover:text-blue-600"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors duration-300 hover:border-orange-300 hover:text-orange-500"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Menu
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-600 transition-colors duration-300 hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              Services
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm font-medium text-slate-600">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Get In Touch
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href="tel:02034885727"
                  className="flex items-start gap-3 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:text-blue-600"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-blue-600" />
                  02034885727
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@onecallhvac.co.uk"
                  className="flex items-start gap-3 text-sm font-medium text-slate-600 transition-colors duration-300 hover:text-slate-900"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-blue-600" />
                  info@onecallhvac.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-600" />
                Serving Greater London &amp; the M25 boroughs
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {year} One Call HVAC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs font-medium text-slate-500 transition-colors duration-300 hover:text-slate-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs font-medium text-slate-500 transition-colors duration-300 hover:text-slate-900"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}