import type { Metadata } from "next";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online with Live Matching & Groups",
  description:
    "Free online regular expression tester with real-time matching, visual highlighting of matches, and group capture details. Supports global (g), case-insensitive (i), multiline (m), and dotAll (s) flags. Test your regex patterns instantly in your browser. No signup required.",
  alternates: {
    canonical: "/regex-tester",
    languages: {
      "en": "/en/regex-tester",
      "zh": "/zh/regex-tester",
      "ja": "/ja/regex-tester",
      "ko": "/ko/regex-tester",
      "es": "/es/regex-tester",
      "fr": "/fr/regex-tester",
      "de": "/de/regex-tester",
      "pt": "/pt/regex-tester",
      "ru": "/ru/regex-tester",
      "ar": "/ar/regex-tester",
      "hi": "/hi/regex-tester",
    },
  },
  openGraph: {
    title: "Regex Tester - Test Regular Expressions Online with Live Matching & Groups",
    description:
      "Free regex tester with real-time matching, highlighting, and group capture.",
    url: `${SITE_URL}/regex-tester`,
    type: "website",
  },
};

export { default } from "./page";
