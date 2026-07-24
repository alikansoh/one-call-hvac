import type { Metadata } from "next";
import ServicesPageClient from "./content";

const BASE_URL = "https://www.onecallhvac.co.uk";
const PAGE_PATH = "/services";
const PAGE_TITLE = "Our Services | AC Repair, Installation & Heating | One Call HVAC";
const PAGE_DESCRIPTION =
  "Explore our full range of HVAC services: air conditioning repair, installation, heating repair, annual servicing, pipework and commercial maintenance across all 32 London boroughs.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "AC repair London",
    "air conditioning installation London",
    "heating repair London",
    "HVAC maintenance London",
    "commercial HVAC services London",
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
        url: `${BASE_URL}/og-image.png`,
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

export default function ServicesPage() {
  return <ServicesPageClient />;
}