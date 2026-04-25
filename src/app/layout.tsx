import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { defaultLocale } from "@/i18n/dictionaries";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DevToolbox - Free Online Developer Tools for JSON, Base64, UUID, Cron & Regex",
    template: "%s | DevToolbox",
  },
  description:
    "Free online developer tools: JSON formatter and validator, Base64 encoder and decoder, UUID v4 generator, Cron expression builder with next run preview, Regex tester with live matching. No signup, no tracking, works in your browser.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "JSON validator",
    "Base64 encoder",
    "Base64 decoder",
    "UUID generator",
    "UUID v4",
    "Cron expression generator",
    "Cron job builder",
    "Regex tester",
    "regular expression tester",
    "online tools",
    "web developer utilities",
    "free developer tools",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "zh": "/zh",
      "ja": "/ja",
      "ko": "/ko",
      "es": "/es",
      "fr": "/fr",
      "de": "/de",
      "pt": "/pt",
      "ru": "/ru",
      "ar": "/ar",
      "hi": "/hi",
    },
  },
  openGraph: {
    title: "DevToolbox - Free Online Developer Tools",
    description:
      "Free online developer tools for everyday coding tasks. JSON formatter, Base64 encoder, UUID generator, Cron builder, Regex tester. No signup required.",
    url: SITE_URL,
    siteName: "DevToolbox",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolbox - Free Online Developer Tools",
    description:
      "Free developer tools: JSON formatter, Base64 encoder, UUID generator, Cron builder, Regex tester.",
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
    google: "CD_qK1jTsLyaaJcoHAeZfvoTP1WJxOvF1kNXLz59Md4",
  },
};

// Schema.org structured data for the website
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevToolbox",
  url: SITE_URL,
  description:
    "Free online developer tools for everyday coding tasks. No signup, no tracking.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevToolbox",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "JSON Formatter and Validator",
    "Base64 Encoder and Decoder",
    "UUID v4 Generator",
    "Cron Expression Generator",
    "Regular Expression Tester",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GoogleAnalytics gaId="G-EH0SKY28M4" />
        <Header locale={defaultLocale} />
        <main className="flex-1">{children}</main>
        <Footer locale={defaultLocale} />
      </body>
    </html>
  );
}
