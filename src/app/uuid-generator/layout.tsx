import type { Metadata } from "next";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

export const metadata: Metadata = {
  title: "UUID Generator - Generate Random UUIDs v4 Online Free in Bulk",
  description:
    "Free online UUID v4 generator. Generate one or multiple random UUIDs instantly in bulk. Supports lowercase, uppercase, and no-dash formats. Perfect for database primary keys, session IDs, and unique identifiers. No signup required.",
  alternates: {
    canonical: "/uuid-generator",
    languages: {
      "en": "/en/uuid-generator",
      "zh": "/zh/uuid-generator",
      "ja": "/ja/uuid-generator",
      "ko": "/ko/uuid-generator",
      "es": "/es/uuid-generator",
      "fr": "/fr/uuid-generator",
      "de": "/de/uuid-generator",
      "pt": "/pt/uuid-generator",
      "ru": "/ru/uuid-generator",
      "ar": "/ar/uuid-generator",
      "hi": "/hi/uuid-generator",
    },
  },
  openGraph: {
    title: "UUID Generator - Generate Random UUIDs v4 Online Free in Bulk",
    description:
      "Free online UUID v4 generator. Create random UUIDs in bulk instantly. Multiple formats supported.",
    url: `${SITE_URL}/uuid-generator`,
    type: "website",
  },
};

export { default } from "./page";
