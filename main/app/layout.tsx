import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
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

export const metadata: Metadata = {
  title: "One Call HVAC | Heating, Cooling & Air Quality Experts",
  description: "Trusted local HVAC installation, repair, and maintenance services.",
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

      </body>
    </html>
  );
}