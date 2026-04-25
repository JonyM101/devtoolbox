"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

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

export default function UuidGeneratorPage() {
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
    </ToolPageLayout>
  );
}
