"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

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
    </ToolPageLayout>
  );
}
