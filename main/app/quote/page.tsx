import type { Metadata } from "next";
import QuoteForm from "./QuoteForm";

const BASE_URL = "https://www.onecallhvac.co.uk";
const PAGE_PATH = "/quote";
const PAGE_TITLE = "Get a Free Quote | AC & Heating Service | One Call HVAC London";
const PAGE_DESCRIPTION =
  "Request a free, no-obligation quote for AC repair, installation, or heating service across London. Response within 30 minutes, 24/7, from licensed and insured technicians.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "free HVAC quote London",
    "AC repair quote",
    "AC installation quote",
    "heating service quote",
    "get a quote HVAC London",
  ],
  alternates: {
    canonical: `${BASE_URL}${PAGE_PATH}`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}${PAGE_PATH}`,
    siteName: "One Call HVAC",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "One Call HVAC — London's trusted heating & air conditioning specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Home Services",
};

export default function QuotePage() {
  return <QuoteForm />;
}