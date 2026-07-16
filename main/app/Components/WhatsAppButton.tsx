"use client";

import Link from "next/link";

const PHONE_NUMBER = "447341314188"; // international format, no + or leading 0
const DEFAULT_MESSAGE = "Hi, I'd like to get a quote for HVAC services.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/25 ring-1 ring-black/5 transition-transform duration-200 hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-8 w-8 fill-white"
        aria-hidden="true"
      >
        <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.258.593 4.46 1.72 6.4L3.2 28.8l6.4-1.68a12.75 12.75 0 0 0 6.4 1.72h.001c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.84-12.8-12.84zm0 23.36a10.5 10.5 0 0 1-5.36-1.47l-.384-.228-3.79 1 1.01-3.694-.25-.38a10.53 10.53 0 0 1-1.626-5.588c0-5.83 4.75-10.58 10.6-10.58 2.83 0 5.49 1.104 7.49 3.104a10.52 10.52 0 0 1 3.104 7.486c0 5.83-4.75 10.58-10.594 10.35zm5.803-7.93c-.318-.16-1.884-.93-2.176-1.036-.292-.106-.505-.16-.717.16-.213.318-.824 1.036-1.01 1.25-.187.212-.373.24-.69.08-.318-.16-1.343-.495-2.558-1.577-.945-.843-1.583-1.883-1.768-2.2-.186-.318-.02-.49.14-.65.144-.143.318-.372.478-.558.16-.187.213-.318.318-.53.106-.213.053-.398-.026-.558-.08-.16-.717-1.727-.982-2.365-.259-.62-.522-.537-.717-.547l-.61-.011c-.213 0-.558.08-.85.398-.292.318-1.116 1.09-1.116 2.658 0 1.567 1.142 3.082 1.302 3.295.16.212 2.248 3.433 5.446 4.815.761.328 1.354.524 1.817.671.763.242 1.457.208 2.006.126.612-.091 1.884-.77 2.15-1.514.266-.743.266-1.38.186-1.513-.08-.133-.293-.212-.61-.372z" />
      </svg>
    </Link>
  );
}