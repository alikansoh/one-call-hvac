import type { Metadata } from "next";
import ContactPageClient from "./content";

const BASE_URL = "https://www.onecallhvac.co.uk";
const PAGE_PATH = "/contact";
const PAGE_TITLE = "Contact Us | Free HVAC Survey & Callback | One Call HVAC London";
const PAGE_DESCRIPTION =
  "Book a free HVAC survey or request a callback from One Call HVAC. Call 0203 488 5727 or fill in our form — a London coordinator responds within 30 minutes. Covering all 32 London boroughs.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  // Keywords are largely ignored by Google but still read by some engines/tools
  keywords: [
    "HVAC contact London",
    "air conditioning quote London",
    "book HVAC survey",
    "heating repair contact",
    "AC installation callback",
    "One Call HVAC contact",
  ],

  // Canonical + language alternates — prevents duplicate-content issues
  alternates: {
    canonical: `${BASE_URL}${PAGE_PATH}`,
  },

  // Open Graph — controls how the page looks when shared on
  // Facebook, LinkedIn, WhatsApp, iMessage link previews, etc.
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}${PAGE_PATH}`,
    siteName: "One Call HVAC",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`, // 1200x630 recommended, shared across all pages
        width: 1200,
        height: 630,
        alt: "One Call HVAC — London's trusted heating & air conditioning specialists",
      },
    ],
  },

  // Twitter/X card — falls back to Open Graph if omitted, but explicit is safer
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/og-image.png`],
  },

  // Robots directives for this specific page (crawl + index allowed)
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

  // Icons/manifest usually live in the root layout, but can be overridden per-page if needed
  // icons: { icon: "/favicon.ico" },

  // Verification tags (fill in if/when you set these up)
  // verification: {
  //   google: "your-google-search-console-code",
  // },

  category: "Home Services",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "One Call HVAC Ltd",
  image: `${BASE_URL}/og-image.png`,
  url: `${BASE_URL}${PAGE_PATH}`,
  telephone: "+442034885727",
  email: "info@onecallhvac.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5 Ranelagh Road",
    addressLocality: "London",
    postalCode: "SW1V 3EX",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "City",
    name: "London",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "££",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}