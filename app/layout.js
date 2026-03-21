import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://despa.co"),

  title: {
    default: "Despa&co — Ingénierie digitale pour la restauration",
    template: "%s | Despa&co",
  },

  description:
    "Despa&co conçoit des solutions digitales sur-mesure pour les restaurateurs : applications natives, SaaS de réservation, automatisation et dashboards haute performance.",

  keywords: [
    "agence digitale restauration",
    "application restaurant",
    "SaaS réservation",
    "app native restaurant",
    "automatisation restauration",
    "Despa&co",
    "Next.js",
    "React Native",
  ],

  authors: [{ name: "Despa&co", url: "https://despa.co" }],
  creator: "Despa&co",
  publisher: "Despa&co",

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

  alternates: { canonical: "https://despa.co/" },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://despa.co/",
    siteName: "Despa&co",
    title: "Despa&co — Ingénierie digitale pour la restauration",
    description:
      "Apps natives, SaaS, réservation, automatisation. Solutions premium pour restaurateurs.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Despa&co — Ingénierie digitale pour la restauration",
    description:
      "Solutions digitales premium pour restaurateurs.",
  },

  icons: {
    icon: [{ url: "/favicon.png", sizes: "any" }],
    apple: "/favicon.png",
  },

  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://despa.co/#org",
      name: "Despa&co",
      url: "https://despa.co/",
      description: "Agence digitale spécialisée restauration haut de gamme.",
    },
    {
      "@type": "ProfessionalService",
      name: "Despa&co Digital Solutions",
      provider: { "@id": "https://despa.co/#org" },
      areaServed: ["France", "Belgium", "Switzerland"],
      serviceType: ["App Development", "SaaS", "Restaurant Technology"],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-[family-name:var(--font-inter)]`}>
        {children}
      </body>
    </html>
  );
}
