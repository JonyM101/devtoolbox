"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

const base64Schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Base64 Encoder / Decoder",
  url: `${SITE_URL}/base64`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 strings with full UTF-8 support.",
  featureList: [
    "Encode text to Base64 format",
    "Decode Base64 strings to plain text",
    "Full UTF-8 character support",
    "One-click swap between encode and decode",
    "Copy output to clipboard",
    "All processing happens in your browser",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Base64 encoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It is commonly used to encode data for transmission over media designed to handle text, such as email or JSON payloads.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use Base64 encoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 encoding is useful when you need to embed binary data (like images or files) in text-based formats such as HTML, CSS, JSON, or XML. It is also used in email attachments (MIME), data URLs, and authentication headers (HTTP Basic Auth).",
      },
    },
    {
      "@type": "Question",
      name: "Does Base64 encoding encrypt my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Base64 is an encoding scheme, not encryption. It does not provide any security or data protection. Anyone can easily decode Base64 strings. Never use Base64 as a substitute for encryption.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool support UTF-8 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this tool fully supports UTF-8 encoding. You can encode and decode text containing international characters, emojis, and other Unicode characters without issues.",
      },
    },
  ],
};

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = useCallback(
    (text: string, m: "encode" | "decode") => {
      if (!text.trim()) {
        setOutput("");
        setError("");
        return;
      }
      try {
        if (m === "encode") {
          setOutput(btoa(unescape(encodeURIComponent(text))));
        } else {
          setOutput(decodeURIComponent(escape(atob(text))));
        }
        setError("");
      } catch {
        setError(m === "decode" ? "Invalid Base64 string" : "Encoding failed");
        setOutput("");
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      process(value, mode);
    },
    [mode, process]
  );

  const handleModeChange = useCallback(
    (newMode: "encode" | "decode") => {
      setMode(newMode);
      process(input, newMode);
    },
    [input, process]
  );

  const copyOutput = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  }, [output]);

  const swapValues = useCallback(() => {
    const newInput = output;
    const newMode = mode === "encode" ? "decode" : "encode";
    setInput(newInput);
    setMode(newMode);
    process(newInput, newMode);
  }, [output, mode, process]);

  return (
    <ToolPageLayout
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 strings. Supports UTF-8 characters."
    >
      <div className="space-y-4">
        {/* Mode Toggle */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-lg border border-input-border overflow-hidden">
            <button
              onClick={() => handleModeChange("encode")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mode === "encode"
                  ? "bg-primary text-white"
                  : "bg-input-bg text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => handleModeChange("decode")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mode === "decode"
                  ? "bg-primary text-white"
                  : "bg-input-bg text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              Decode
            </button>
          </div>
          <button
            onClick={swapValues}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm"
          >
            ⇄ Swap
          </button>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm disabled:opacity-40"
          >
            Copy Output
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              {mode === "encode" ? "Plain Text" : "Base64 String"}
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 string to decode..."
              }
              className="w-full h-64 p-4 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-64 p-4 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <JsonLd data={base64Schema} />
      <JsonLd data={faqSchema} />

      {/* SEO Content Section */}
      <section className="mt-12 space-y-8">
        <h2 className="text-xl font-bold">About Base64 Encoder / Decoder</h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Our free online Base64 encoder and decoder lets you quickly convert between plain text and
          Base64 format. Whether you&apos;re working with data URIs, email attachments, API payloads,
          or authentication headers, this tool handles it all with full UTF-8 support. All processing
          happens locally in your browser — your data is never sent to any server.
        </p>

        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">What is Base64 encoding?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64
              printable ASCII characters (A-Z, a-z, 0-9, +, /). It is commonly used to encode data for
              transmission over media designed to handle text, such as email or JSON payloads.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">When should I use Base64 encoding?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Base64 encoding is useful when you need to embed binary data (like images or files) in
              text-based formats such as HTML, CSS, JSON, or XML. It is also used in email attachments
              (MIME), data URLs, and authentication headers (HTTP Basic Auth).
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Does Base64 encoding encrypt my data?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              No, Base64 is an encoding scheme, not encryption. It does not provide any security or data
              protection. Anyone can easily decode Base64 strings. Never use Base64 as a substitute for
              encryption.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Does this tool support UTF-8 characters?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Yes, this tool fully supports UTF-8 encoding. You can encode and decode text containing
              international characters, emojis, and other Unicode characters without issues.
            </p>
          </div>
        </div>
      </section>
    </ToolPageLayout>
  );
}
