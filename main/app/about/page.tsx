import type { Metadata } from "next";
import AboutPageClient from "./content";

const BASE_URL = "https://www.onecallhvac.co.uk";
const PAGE_PATH = "/about";
const PAGE_TITLE = "About Us | Trusted HVAC Specialists in London | One Call HVAC";
const PAGE_DESCRIPTION =
  "One Call HVAC is a London-based, F-Gas certified and fully insured HVAC company covering all 32 boroughs. Learn about our engineers, values and commitment to honest, upfront pricing.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "about One Call HVAC",
    "HVAC company London",
    "F-Gas certified engineers",
    "air conditioning company London",
    "heating specialists London",
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

export default function AboutPage() {
  return <AboutPageClient />;
}