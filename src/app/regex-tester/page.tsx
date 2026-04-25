"use client";

import { useState, useMemo, useCallback } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    if (!pattern || !testString) return [];

    try {
      const regex = new RegExp(pattern, flags);
      const results: { match: string; index: number; groups: Record<string, string> | undefined }[] = [];

      if (flags.includes("g")) {
        let match;
        let safety = 0;
        while ((match = regex.exec(testString)) !== null && safety < 1000) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.groups,
          });
          if (match[0].length === 0) regex.lastIndex++;
          safety++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.groups,
          });
        }
      }

      setError("");
      return results;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flags, testString]);

  // Highlighted text with matches
  const highlightedText = useMemo(() => {
    if (!pattern || !testString || matches.length === 0) return null;

    try {
      const regex = new RegExp(pattern, flags);
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;

      if (flags.includes("g")) {
        let match;
        let safety = 0;
        const tempRegex = new RegExp(pattern, flags);
        while ((match = tempRegex.exec(testString)) !== null && safety < 1000) {
          if (match.index > lastIndex) {
            parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
          }
          parts.push({ text: match[0], isMatch: true });
          lastIndex = match.index + match[0].length;
          if (match[0].length === 0) tempRegex.lastIndex++;
          safety++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          if (match.index > 0) {
            parts.push({ text: testString.slice(0, match.index), isMatch: false });
          }
          parts.push({ text: match[0], isMatch: true });
          lastIndex = match.index + match[0].length;
        }
      }

      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false });
      }

      return parts;
    } catch {
      return null;
    }
  }, [pattern, flags, testString, matches]);

  const toggleFlag = useCallback((flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  }, []);

  const flagOptions = [
    { flag: "g", label: "Global (g)", desc: "Find all matches" },
    { flag: "i", label: "Case insensitive (i)", desc: "Ignore case" },
    { flag: "m", label: "Multiline (m)", desc: "^ and $ match line starts/ends" },
    { flag: "s", label: "DotAll (s)", desc: ". matches newlines" },
  ];

  return (
    <ToolPageLayout
      title="Regex Tester"
      description="Test regular expressions with real-time matching, group capture, and visual highlighting."
    >
      <div className="space-y-4">
        {/* Pattern Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Regular Expression
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-input-border rounded-lg bg-input-bg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary">
              <span className="px-3 text-zinc-400 font-mono">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 py-2 font-mono text-sm bg-transparent focus:outline-none"
                spellCheck={false}
              />
              <span className="px-1 text-zinc-400 font-mono">/</span>
              <span className="px-2 text-primary font-mono text-sm">{flags}</span>
            </div>
          </div>
        </div>

        {/* Flags */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Flags
          </label>
          <div className="flex flex-wrap gap-2">
            {flagOptions.map(({ flag, label }) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  flags.includes(flag)
                    ? "bg-primary text-white border-primary"
                    : "bg-input-bg border-input-border hover:border-primary/40 text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Test String */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-32 p-4 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            spellCheck={false}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Highlighted Result */}
        {highlightedText && (
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Match Preview
            </label>
            <div className="p-4 border border-input-border rounded-lg bg-input-bg font-mono text-sm whitespace-pre-wrap break-all">
              {highlightedText.map((part, i) =>
                part.isMatch ? (
                  <mark
                    key={i}
                    className="bg-yellow-200 dark:bg-yellow-800 text-foreground rounded-sm px-0.5"
                  >
                    {part.text}
                  </mark>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </div>
          </div>
        )}

        {/* Match Details */}
        {matches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Match Details ({matches.length} match{matches.length > 1 ? "es" : ""})
              </label>
            </div>
            <div className="border border-card-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800">
                    <th className="px-4 py-2 text-left font-medium text-zinc-500">#</th>
                    <th className="px-4 py-2 text-left font-medium text-zinc-500">Match</th>
                    <th className="px-4 py-2 text-left font-medium text-zinc-500">Index</th>
                    <th className="px-4 py-2 text-left font-medium text-zinc-500">Groups</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {matches.map((m, i) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="px-4 py-2 text-zinc-500">{i + 1}</td>
                      <td className="px-4 py-2 font-mono">{m.match}</td>
                      <td className="px-4 py-2 font-mono text-zinc-500">{m.index}</td>
                      <td className="px-4 py-2 font-mono text-zinc-500">
                        {m.groups ? JSON.stringify(m.groups) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state */}
        {matches.length === 0 && pattern && testString && !error && (
          <div className="text-center py-6 text-zinc-400 text-sm">
            No matches found
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
