import type { Metadata } from "next";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

export const metadata: Metadata = {
  title: "Cron Expression Generator - Build & Test Cron Jobs with Next Run Preview",
  description:
    "Free online cron expression generator and tester. Build cron expressions visually with presets, see human-readable descriptions, preview next 5 run times, and copy the expression for your crontab. Supports all standard cron fields. No signup required.",
  alternates: {
    canonical: "/cron-generator",
    languages: {
      "en": "/en/cron-generator",
      "zh": "/zh/cron-generator",
      "ja": "/ja/cron-generator",
      "ko": "/ko/cron-generator",
      "es": "/es/cron-generator",
      "fr": "/fr/cron-generator",
      "de": "/de/cron-generator",
      "pt": "/pt/cron-generator",
      "ru": "/ru/cron-generator",
      "ar": "/ar/cron-generator",
      "hi": "/hi/cron-generator",
    },
  },
  openGraph: {
    title: "Cron Expression Generator - Build & Test Cron Jobs with Next Run Preview",
    description:
      "Free cron expression builder with next run time preview and human-readable descriptions.",
    url: `${SITE_URL}/cron-generator`,
    type: "website",
  },
};

export { default } from "./page";
