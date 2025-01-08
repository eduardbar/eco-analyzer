import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoAnalyzer - Análisis de Impacto Ambiental",
  description: "Analiza el impacto ambiental de productos con IA. Calcula huella de carbono, uso de agua y sostenibilidad de materiales.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%2322c55e"/><path d="M25 65c0-15 10-30 20-30s20 15 20 30c0 5-2.5 10-7.5 12.5-2.5 2.5-7.5 2.5-10 0-2.5-2.5-2.5-7.5 0-10 2.5-2.5 5-2.5 7.5 0" fill="white" stroke="%2316a34a" stroke-width="2"/><path d="M45 35v30" stroke="%2316a34a" stroke-width="3"/></svg>',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
