import type { Metadata } from "next";

const SITE_URL = "https://devtoolbox.dev";

export const metadata: Metadata = {
  title: "JSON Formatter - Beautify, Validate & Minify JSON Online Free",
  description:
    "Free online JSON formatter, validator, beautifier and minifier. Format JSON with custom indentation (2/4 spaces), validate syntax errors, and minify JSON data instantly in your browser. No signup required.",
  alternates: {
    canonical: "/json-formatter",
    languages: {
      "en": "/en/json-formatter",
      "zh": "/zh/json-formatter",
      "ja": "/ja/json-formatter",
      "ko": "/ko/json-formatter",
      "es": "/es/json-formatter",
      "fr": "/fr/json-formatter",
      "de": "/de/json-formatter",
      "pt": "/pt/json-formatter",
      "ru": "/ru/json-formatter",
      "ar": "/ar/json-formatter",
      "hi": "/hi/json-formatter",
    },
  },
  openGraph: {
    title: "JSON Formatter - Beautify, Validate & Minify JSON Online Free",
    description:
      "Free online JSON formatter and validator. Format, minify, and validate JSON data instantly. No signup required.",
    url: `${SITE_URL}/json-formatter`,
    type: "website",
  },
};

// Schema.org structured data
const jsonFormatterSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Formatter",
  url: `${SITE_URL}/json-formatter`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online JSON formatter, validator, beautifier and minifier. Format JSON with custom indentation, validate syntax, and minify data.",
  featureList: [
    "Format and beautify JSON data",
    "Validate JSON syntax with error messages",
    "Minify JSON to compact form",
    "Custom indentation (2 spaces, 4 spaces, 1 tab)",
    "Copy formatted output to clipboard",
    "No data sent to servers - all processing in browser",
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Format JSON Online",
  description: "Step-by-step guide to format and validate JSON data using the free online JSON formatter tool.",
  step: [
    {
      "@type": "HowToStep",
      name: "Paste JSON",
      text: "Paste your JSON data into the input textarea on the left side.",
    },
    {
      "@type": "HowToStep",
      name: "Click Format",
      text: "Click the Format button to beautify your JSON with proper indentation.",
    },
    {
      "@type": "HowToStep",
      name: "Copy Result",
      text: "Click Copy Output to copy the formatted JSON to your clipboard.",
    },
  ],
};

export { default } from "./page";

export { jsonFormatterSchema, howToSchema };
