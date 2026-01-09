import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// ============================================================================
// FUENTES
// ============================================================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: "EcoAnalyzer | Análisis Ambiental Profesional",
  description: "Plataforma de análisis de impacto ambiental potenciada por IA. Métricas precisas para decisiones sostenibles.",
  keywords: ["análisis ambiental", "huella de carbono", "IA", "sostenibilidad", "eco score"],
  authors: [{ name: "EcoAnalyzer Team" }],
  openGraph: {
    title: "EcoAnalyzer | Análisis Ambiental Profesional",
    description: "Plataforma de análisis de impacto ambiental potenciada por IA. Métricas precisas para decisiones sostenibles.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EcoAnalyzer - Análisis Ambiental Profesional",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoAnalyzer | Análisis Ambiental Profesional",
    description: "Plataforma de análisis de impacto ambiental potenciada por IA. Métricas precisas para decisiones sostenibles.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ============================================================================
// LAYOUT
// ============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
