import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Providers } from "@/components/Providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CustomCursor from "@/components/layout/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.shamaaltourism.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Shamaal Tourism — The Great North",
    default: "Shamaal Tourism — Premium Pakistan Tours | The Great North",
  },
  description:
    "Pakistan's #1 premium tour operator. Book guided tours to Hunza, Skardu, Fairy Meadows, Swat, Chitral & beyond. Luxury travel experiences in Northern Pakistan.",
  keywords: [
    "Pakistan tourism", "Northern Pakistan tours", "Hunza tours", "Skardu tours",
    "Fairy Meadows trek", "K2 base camp", "Gilgit Baltistan tourism",
    "Pakistan travel packages", "Shamaal Tourism", "Great North Pakistan",
  ],
  authors: [{ name: "Shamaal Tourism", url: BASE_URL }],
  creator: "Shamaal Tourism",
  publisher: "Shamaal Tourism",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Shamaal Tourism",
    title: "Shamaal Tourism — The Great North | Premium Pakistan Tours",
    description:
      "Pakistan's #1 premium tour operator. Discover the breathtaking landscapes of Northern Pakistan with expert guides and luxury travel packages.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Shamaal Tourism — The Great North",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamaal Tourism — The Great North",
    description: "Premium guided tours across Northern Pakistan — Hunza, Skardu, Fairy Meadows and beyond.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@ShamaalTourism",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "ur-PK": `${BASE_URL}/ur`,
    },
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
  verification: {
    google: "burGc3e9tW8vOiZa2zQb50FzUe8WBr4dghnt0AwDO2k",
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Shamaal Tourism",
  description:
    "Pakistan's premium guided tour operator specialising in Northern Pakistan — Hunza, Skardu, Fairy Meadows, Swat, Chitral and beyond.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  telephone: "0318-0425044",
  email: "Shamaaltours@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "UG-18 Big City Plaza, Liberty Roundabout",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    postalCode: "54000",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.7294,
    longitude: 73.0931,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/shamaaltourism",
    "https://www.facebook.com/shamaaltourism",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "3500",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="burGc3e9tW8vOiZa2zQb50FzUe8WBr4dghnt0AwDO2k" />
      </head>
      <body 
        className="min-h-full flex flex-col bg-[#060d1a] text-white overflow-x-hidden"
        suppressHydrationWarning
      >
        <CustomCursor />
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
      </body>
    </html>
  );
}
