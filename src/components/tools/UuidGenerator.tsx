"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

const uuidSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator",
  url: `${SITE_URL}/uuid-generator`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free online UUID v4 generator. Create random UUIDs in bulk with lowercase, uppercase, or no-dash formats.",
  featureList: [
    "Generate UUID v4 (random) identifiers",
    "Bulk generation up to 100 UUIDs at once",
    "Lowercase, uppercase, and no-dash formats",
    "One-click copy individual or all UUIDs",
    "Cryptographically secure random generation",
    "No server-side processing — all in browser",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UUID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A UUID (Universally Unique Identifier) is a 128-bit identifier standard defined by RFC 4122. It is designed to be unique across both space and time without requiring a central coordination mechanism. The most common version is UUID v4, which uses random numbers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between UUID v1 and v4?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUID v1 is generated using the machine's MAC address and timestamp, making it sequentially sortable but potentially revealing host information. UUID v4 uses random numbers, providing better privacy and no sequential pattern, but cannot be sorted by creation time.",
      },
    },
    {
      "@type": "Question",
      name: "Are UUIDs guaranteed to be unique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While UUIDs are not 100% guaranteed to be unique, the probability of collision is astronomically small. For UUID v4, the chance of generating a duplicate is about 1 in 2.71 × 10^18. In practice, you can treat UUIDs as unique for any realistic application.",
      },
    },
    {
      "@type": "Question",
      name: "What are UUIDs used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUIDs are commonly used as database primary keys, session identifiers, file names, message IDs, and anywhere you need a unique identifier without coordination between systems. They are especially useful in distributed systems where auto-incrementing IDs would conflict.",
      },
    },
  ],
};

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<"lowercase" | "uppercase" | "no-dashes">("lowercase");

  const generate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => {
      const uuid = generateUUID();
      switch (format) {
        case "uppercase":
          return uuid.toUpperCase();
        case "no-dashes":
          return uuid.replace(/-/g, "");
        default:
          return uuid;
      }
    });
    setUuids(newUuids);
  }, [count, format]);

  const copyAll = useCallback(async () => {
    if (uuids.length > 0) {
      await navigator.clipboard.writeText(uuids.join("\n"));
    }
  }, [uuids]);

  const copyOne = useCallback(async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
  }, []);

  return (
    <ToolPageLayout
      title="UUID Generator"
      description="Generate random UUIDs (v4) for your applications. Supports bulk generation."
    >
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Count
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
              className="w-20 px-3 py-2 text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "lowercase" | "uppercase" | "no-dashes")}
              className="px-3 py-2 text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="lowercase">lowercase</option>
              <option value="uppercase">UPPERCASE</option>
              <option value="no-dashes">No dashes</option>
            </select>
          </div>
          <button
            onClick={generate}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
          >
            Generate
          </button>
          <button
            onClick={copyAll}
            disabled={uuids.length === 0}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm disabled:opacity-40"
          >
            Copy All
          </button>
        </div>

        {/* UUID List */}
        {uuids.length > 0 && (
          <div className="border border-card-border rounded-lg overflow-hidden">
            <div className="divide-y divide-card-border">
              {uuids.map((uuid, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 group"
                >
                  <code className="font-mono text-sm">{uuid}</code>
                  <button
                    onClick={() => copyOne(uuid)}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs text-zinc-500 hover:text-primary transition-all"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {uuids.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            Click &quot;Generate&quot; to create UUIDs
          </div>
        )}
      </div>

      {/* Schema.org Structured Data */}
      <JsonLd data={uuidSchema} />
      <JsonLd data={faqSchema} />

      {/* SEO Content Section */}
      <section className="mt-12 space-y-8">
        <h2 className="text-xl font-bold">About UUID Generator</h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Our free online UUID generator creates cryptographically secure UUID v4 identifiers for your
          applications. Generate up to 100 UUIDs at once in lowercase, uppercase, or no-dash formats.
          Perfect for database primary keys, session tokens, and distributed system identifiers. All
          generation happens in your browser using the Web Crypto API.
        </p>

        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">What is a UUID?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              A UUID (Universally Unique Identifier) is a 128-bit identifier standard defined by RFC 4122.
              It is designed to be unique across both space and time without requiring a central coordination
              mechanism. The most common version is UUID v4, which uses random numbers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">What is the difference between UUID v1 and v4?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              UUID v1 is generated using the machine&apos;s MAC address and timestamp, making it sequentially
              sortable but potentially revealing host information. UUID v4 uses random numbers, providing
              better privacy and no sequential pattern, but cannot be sorted by creation time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Are UUIDs guaranteed to be unique?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              While UUIDs are not 100% guaranteed to be unique, the probability of collision is astronomically
              small. For UUID v4, the chance of generating a duplicate is about 1 in 2.71 × 10^18. In practice,
              you can treat UUIDs as unique for any realistic application.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">What are UUIDs used for?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              UUIDs are commonly used as database primary keys, session identifiers, file names, message IDs,
              and anywhere you need a unique identifier without coordination between systems. They are especially
              useful in distributed systems where auto-incrementing IDs would conflict.
            </p>
          </div>
        </div>
      </section>
    </ToolPageLayout>
  );
}
