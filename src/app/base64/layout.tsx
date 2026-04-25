import type { Metadata } from "next";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - Encode & Decode Base64 Strings Online Free",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 strings instantly in your browser. Supports UTF-8 characters, automatic encoding detection, and one-click swap. No signup required.",
  alternates: {
    canonical: "/base64",
    languages: {
      "en": "/en/base64",
      "zh": "/zh/base64",
      "ja": "/ja/base64",
      "ko": "/ko/base64",
      "es": "/es/base64",
      "fr": "/fr/base64",
      "de": "/de/base64",
      "pt": "/pt/base64",
      "ru": "/ru/base64",
      "ar": "/ar/base64",
      "hi": "/hi/base64",
    },
  },
  openGraph: {
    title: "Base64 Encoder/Decoder - Encode & Decode Base64 Strings Online Free",
    description:
      "Free online Base64 encoder and decoder. Convert text to Base64 or decode instantly. Supports UTF-8.",
    url: `${SITE_URL}/base64`,
    type: "website",
  },
};

export { default } from "./page";
