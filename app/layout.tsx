import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ConsentBanner } from "@/components/ConsentBanner";
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
  title: {
    default: "VertragsKlar - KI-Vertragsanalyse in Sekunden",
    template: "%s | VertragsKlar",
  },
  description: "Lassen Sie Ihre Verträge von unserer KI prüfen. VertragsKlar analysiert Mietverträge, Arbeitsverträge und AGBs sekundenschnell auf Risiken. Einfach, sicher & deutsch.",
  keywords: [
    "Vertragsanalyse",
    "KI Anwalt",
    "Vertrag prüfen",
    "Mietvertrag Check",
    "Arbeitsvertrag prüfen",
    "Legal Tech Deutschland",
    "KI Rechtsberatung",
    "Vertragscheck online",
  ],
  authors: [{ name: "VertragsKlar Team" }],
  creator: "VertragsKlar",
  publisher: "VertragsKlar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VertragsKlar - KI-Vertragsanalyse in Sekunden",
    description: "Sicherheit für Ihre Verträge. KI-gestützte Analyse für Miet-, Arbeits- und Kaufverträge. Finden Sie versteckte Klauseln und Risiken sofort.",
    url: "https://vertragsklar.de",
    siteName: "VertragsKlar",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VertragsKlar - KI-Vertragsanalyse",
    description: "Ihre Verträge, verständlich und sicher. Prüfen Sie jetzt Ihre Dokumente mit KI.",
    creator: "@vertragsklar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "VertragsKlar",
              "applicationCategory": "LegalTech",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "3.99",
                "priceCurrency": "EUR"
              },
              "description": "KI-gestützte Vertragsanalyse für deutsche Verträge.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            }),
          }}
        />
        {children}
        <Analytics />
        <ConsentBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

