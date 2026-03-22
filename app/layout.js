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

/* ═══════════════════════════════════════════════════════
   METADATA  — Title ≤ 60 chars | Description 120-160 chars
   ═══════════════════════════════════════════════════════ */

export const metadata = {
  metadataBase: new URL("https://despa.co"),

  title: {
    // 55 chars — ideal range
    default: "Despa&co — Agence Digitale · Verviers & Liège",
    template: "%s | Despa&co",
  },

  // 152 chars — ideal range
  description:
    "Agence digitale à Verviers (Liège, Belgique). Développement d'applications, sites web, SaaS et automatisation pour la restauration. Devis gratuit sous 48h.",

  keywords: [
    // Local Belgian SEO
    "agence digitale Verviers",
    "agence digitale Liège",
    "agence digitale Belgique",
    "développeur web Verviers",
    "développeur web Liège",
    "développeur web Belgique",
    "création site web Verviers",
    "création application Verviers",
    "freelance développeur Verviers",

    // Service-level
    "agence web restauration",
    "application restaurant Belgique",
    "SaaS restauration",
    "application native restaurant",
    "développement Next.js Belgique",
    "React Native Belgique",
    "automatisation restauration",
    "dashboard restaurant",
    "réservation en ligne restaurant",

    // Brand
    "Despa&co",
    "Despaco",
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

  alternates: {
    canonical: "https://despa.co/",
    languages: {
      "fr-BE": "https://despa.co/",
      "fr-FR": "https://despa.co/",
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://despa.co/",
    siteName: "Despa&co",
    title: "Despa&co — Agence Digitale · Verviers & Liège",
    description:
      "Apps, sites web et SaaS pour la restauration. Basés à Verviers (Liège, Belgique). Expertise Next.js, React Native, Supabase.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Despa&co — Agence Digitale Verviers Liège Belgique",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@despa_co",
    creator: "@despa_co",
    title: "Despa&co — Agence Digitale · Verviers & Liège",
    description:
      "Apps, SaaS et sites premium pour la restauration. Basés à Verviers, Belgique.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [{ url: "/favicon.png", sizes: "any" }],
    apple: "/favicon.png",
  },

  category: "technology",
  classification: "Business",

  // Geo tags for search engines
  other: {
    "geo.region": "BE-WLG",
    "geo.placename": "Verviers, Liège, Belgique",
    "geo.position": "50.589;5.864",
    ICBM: "50.589, 5.864",
    language: "fr-BE",
    "revisit-after": "7 days",
  },
};

/* ═══════════════════════════════════════════════════════
   JSON-LD STRUCTURED DATA  — Rich & complete
   ═══════════════════════════════════════════════════════ */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "Organization",
      "@id": "https://despa.co/#org",
      name: "Despa&co",
      alternateName: "Despaco",
      url: "https://despa.co/",
      logo: {
        "@type": "ImageObject",
        url: "https://despa.co/favicon.png",
        width: 60,
        height: 60,
      },
      description:
        "Agence digitale basée à Verviers (Liège, Belgique), spécialisée dans le développement d'applications, sites web et SaaS pour la restauration.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Verviers",
        addressRegion: "Liège",
        addressCountry: "BE",
        postalCode: "4800",
      },
      areaServed: [
        { "@type": "City", name: "Verviers" },
        { "@type": "City", name: "Liège" },
        { "@type": "AdministrativeArea", name: "Wallonie" },
        { "@type": "Country", name: "Belgique" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "Luxembourg" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["French", "English"],
        contactOption: "TollFree",
        areaServed: "BE",
      },
      sameAs: [
        "https://www.linkedin.com/company/despaco",
        "https://www.instagram.com/despaco",
        "https://github.com/despaco",
      ],
    },

    // 2. LocalBusiness (for local SEO signals)
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://despa.co/#localbusiness",
      name: "Despa&co — Agence Digitale",
      image: "https://despa.co/og-image.jpg",
      url: "https://despa.co/",
      description:
        "Agence de développement web et mobile à Verviers (province de Liège, Belgique). Applications natives, SaaS, sites web et automatisation pour restaurateurs.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Verviers",
        addressRegion: "Liège",
        postalCode: "4800",
        addressCountry: "BE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "50.589",
        longitude: "5.864",
      },
      areaServed: [
        { "@type": "City", name: "Verviers" },
        { "@type": "City", name: "Liège" },
        { "@type": "City", name: "Bruxelles" },
        { "@type": "Country", name: "Belgique" },
        { "@type": "Country", name: "France" },
      ],
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Virement bancaire, carte de crédit",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },

    // 3. WebSite (enables Sitelinks SearchBox in Google)
    {
      "@type": "WebSite",
      "@id": "https://despa.co/#website",
      url: "https://despa.co/",
      name: "Despa&co",
      description: "Agence digitale à Verviers — Applications, SaaS & Sites web pour restaurateurs.",
      publisher: { "@id": "https://despa.co/#org" },
      inLanguage: "fr-BE",
    },

    // 4. Service — App Development
    {
      "@type": "Service",
      name: "Développement d'applications mobiles restaurant",
      serviceType: "Application Native (iOS/Android)",
      provider: { "@id": "https://despa.co/#org" },
      areaServed: [
        { "@type": "City", name: "Verviers" },
        { "@type": "City", name: "Liège" },
        { "@type": "Country", name: "Belgique" },
      ],
      description:
        "Développement d'applications natives iOS et Android pour restaurants : commande à table, réservation, fidélisation.",
      offer: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },

    // 5. Service — SaaS / Web
    {
      "@type": "Service",
      name: "Création site web restaurant Belgique",
      serviceType: "Site Web & SaaS",
      provider: { "@id": "https://despa.co/#org" },
      areaServed: [
        { "@type": "City", name: "Verviers" },
        { "@type": "City", name: "Liège" },
        { "@type": "Country", name: "Belgique" },
      ],
      description:
        "Conception et développement de sites web premium et solutions SaaS pour restaurateurs en Belgique. Next.js, React, Supabase.",
    },

    // 6. FAQPage (SEO bonus — rich snippets)
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Où est basée l'agence Despa&co ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Despa&co est une agence digitale basée à Verviers, dans la province de Liège en Belgique. Nous intervenons dans toute la Belgique (Bruxelles, Namur, Charleroi) et à l'international (France, Luxembourg, Suisse).",
          },
        },
        {
          "@type": "Question",
          name: "Quels services propose Despa&co ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Despa&co propose le développement d'applications mobiles natives (iOS/Android), de sites web premium (Next.js), de solutions SaaS pour la restauration, ainsi que des dashboards de gestion et l'automatisation des processus métier.",
          },
        },
        {
          "@type": "Question",
          name: "Combien coûte la création d'une application restaurant ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Le tarif dépend du périmètre fonctionnel. Nous proposons un audit gratuit et un devis détaillé sous 48h. Contactez-nous via le formulaire pour en savoir plus.",
          },
        },
        {
          "@type": "Question",
          name: "Despa&co travaille-t-il avec des restaurateurs hors Belgique ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Oui, nous accompagnons des établissements en France, au Luxembourg, en Suisse et dans toute la zone francophone. Nos projets sont menés entièrement à distance.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        {/* Preconnects for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
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
