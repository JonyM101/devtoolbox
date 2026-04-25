"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

const jsonFormatterSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Formatter",
  url: `${SITE_URL}/json-formatter`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is JSON formatting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON formatting (also called beautifying or pretty-printing) is the process of adding indentation, line breaks, and spacing to JSON data to make it more readable for humans. For example, converting {\"name\":\"John\",\"age\":30} into a properly indented multi-line format.",
      },
    },
    {
      "@type": "Question",
      name: "How do I validate JSON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your JSON data into the input field and click Format. If the JSON is valid, it will be formatted and displayed in the output. If there are syntax errors, the tool will show the specific error message with details about what went wrong.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data safe when using this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all processing happens entirely in your browser. Your JSON data is never sent to any server. This tool works offline and does not store any of your data.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between formatting and minifying JSON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Formatting adds indentation and line breaks to make JSON readable for humans. Minifying removes all unnecessary whitespace (spaces, line breaks, indentation) to make the JSON as compact as possible, which is useful for reducing file size in production.",
      },
    },
  ],
};

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const formatJson = useCallback(() => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, indent]);

  const minifyJson = useCallback(() => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyOutput = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, minify, and beautify JSON data. All processing happens in your browser."
    >
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={formatJson}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
          >
            Format
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm"
          >
            Minify
          </button>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm disabled:opacity-40"
          >
            Copy Output
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 text-zinc-500 hover:text-red-500 transition-colors font-medium text-sm"
          >
            Clear
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-zinc-500">Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-input-border rounded-md bg-input-bg"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 text-sm">
            Invalid JSON: {error}
          </div>
        )}

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Input JSON
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here... e.g. {"name": "John", "age": 30}'
              className="w-full h-80 p-4 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Output
            </label>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="w-full h-80 p-4 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <JsonLd data={jsonFormatterSchema} />
      <JsonLd data={faqSchema} />

      {/* SEO Content Section */}
      <section className="mt-12 space-y-8">
        <h2 className="text-xl font-bold">About JSON Formatter</h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Our free online JSON formatter helps you beautify, validate, and minify JSON data instantly.
          Whether you&apos;re debugging API responses, editing configuration files, or working with data payloads,
          this tool makes it easy to read and validate your JSON. All processing happens in your browser —
          your data never leaves your device.
        </p>

        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">What is JSON formatting?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              JSON formatting (also called beautifying or pretty-printing) is the process of adding
              indentation, line breaks, and spacing to JSON data to make it more readable for humans.
              For example, converting <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-xs">&#123;&quot;name&quot;:&quot;John&quot;,&quot;age&quot;:30&#125;</code> into
              a properly indented multi-line format.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">How do I validate JSON?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Paste your JSON data into the input field and click Format. If the JSON is valid, it will be
              formatted and displayed in the output. If there are syntax errors, the tool will show the
              specific error message with details about what went wrong.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Is my data safe when using this tool?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Yes, all processing happens entirely in your browser. Your JSON data is never sent to any
              server. This tool works offline and does not store any of your data.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">What is the difference between formatting and minifying JSON?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Formatting adds indentation and line breaks to make JSON readable for humans. Minifying removes
              all unnecessary whitespace (spaces, line breaks, indentation) to make the JSON as compact as
              possible, which is useful for reducing file size in production.
            </p>
          </div>
        </div>
      </section>
    </ToolPageLayout>
  );
}
