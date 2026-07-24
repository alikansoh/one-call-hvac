import type { Metadata, Viewport } from "next";
import { Inter, Archivo } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhatsAppButton from "./Components/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const BASE_URL = "https://www.onecallhvac.co.uk";
const SITE_NAME = "One Call HVAC";
const DEFAULT_TITLE = "One Call HVAC | Heating, Cooling & Air Quality Experts";
const DEFAULT_DESCRIPTION =
  "Trusted local HVAC installation, repair, and maintenance services across all 32 London boroughs. Licensed, insured engineers with upfront pricing and 24/7 emergency response.";

export const metadata: Metadata = {
  // Resolves all relative URLs (OG images, canonicals, etc.) across every page.
  // Without this, per-page metadata using relative paths can fail in some crawlers.
  metadataBase: new URL(BASE_URL),

  // Template lets child pages set just their own bit, e.g. title: "Contact Us"
  // renders as "Contact Us | One Call HVAC" automatically. Pages that export
  // a full title (like your current page.tsx files) simply override this.
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "HVAC London",
    "air conditioning installation London",
    "heating repair London",
    "AC repair London",
    "boiler service London",
    "commercial HVAC London",
  ],
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  formatDetection: {
    telephone: true, // lets mobile browsers auto-link phone numbers in text
    email: false,
    address: false,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "One Call HVAC — London's trusted heating & air conditioning specialists",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
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

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  // Uncomment and fill in once you've set these up:
  // verification: {
  //   google: "your-google-search-console-verification-code",
  // },

  category: "Home Services",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03142b", // matches your dark navy brand color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}