"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const FIELDS = [
  { name: "Minute", range: "0-59" },
  { name: "Hour", range: "0-23" },
  { name: "Day of Month", range: "1-31" },
  { name: "Month", range: "1-12" },
  { name: "Day of Week", range: "0-6 (0=Sunday)" },
];

const PRESETS: { label: string; cron: string; description: string }[] = [
  { label: "Every minute", cron: "* * * * *", description: "Runs every minute" },
  { label: "Every hour", cron: "0 * * * *", description: "Runs at the start of every hour" },
  { label: "Every day at midnight", cron: "0 0 * * *", description: "Runs daily at 00:00" },
  { label: "Every Monday at 9 AM", cron: "0 9 * * 1", description: "Runs every Monday at 09:00" },
  { label: "Every weekday at 9 AM", cron: "0 9 * * 1-5", description: "Runs Mon-Fri at 09:00" },
  { label: "Every 15 minutes", cron: "*/15 * * * *", description: "Runs every 15 minutes" },
  { label: "Every 6 hours", cron: "0 */6 * * *", description: "Runs every 6 hours" },
  { label: "First day of month", cron: "0 0 1 * *", description: "Runs monthly on the 1st at 00:00" },
];

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return "Invalid cron expression";

  const [min, hour, dom, mon, dow] = parts;
  const descriptions: string[] = [];

  // Minute
  if (min === "*") descriptions.push("every minute");
  else if (min.startsWith("*/")) descriptions.push(`every ${min.slice(2)} minutes`);
  else descriptions.push(`at minute ${min}`);

  // Hour
  if (hour === "*") descriptions.push("every hour");
  else if (hour.startsWith("*/")) descriptions.push(`every ${hour.slice(2)} hours`);
  else descriptions.push(`at hour ${hour}`);

  // Day of Month
  if (dom !== "*") descriptions.push(`on day ${dom} of the month`);

  // Month
  if (mon !== "*") descriptions.push(`in month ${mon}`);

  // Day of Week
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (dow !== "*") {
    if (dow.includes("-")) {
      descriptions.push(`on ${dow} (day of week)`);
    } else {
      const dayNum = parseInt(dow);
      if (!isNaN(dayNum) && dayNum >= 0 && dayNum <= 6) {
        descriptions.push(`on ${dayNames[dayNum]}`);
      } else {
        descriptions.push(`on day ${dow} of the week`);
      }
    }
  }

  return descriptions.join(", ");
}

// Generate next N run times (simplified - for basic expressions)
function getNextRuns(cronStr: string, count: number): Date[] {
  const parts = cronStr.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const [minPart, hourPart, domPart, monPart, dowPart] = parts;
  const runs: Date[] = [];
  const now = new Date();
  const start = new Date(now.getTime() + 60000); // start from next minute
  start.setSeconds(0, 0);

  const maxIterations = 500000;
  let iterations = 0;
  const current = new Date(start);

  while (runs.length < count && iterations < maxIterations) {
    iterations++;
    const m = current.getMinutes();
    const h = current.getHours();
    const d = current.getDate();
    const mo = current.getMonth() + 1;
    const dow = current.getDay();

    const matchMin = minPart === "*" || minPart.startsWith("*/")
      ? (minPart === "*" || m % parseInt(minPart.slice(2)) === 0)
      : m === parseInt(minPart);
    const matchHour = hourPart === "*" || hourPart.startsWith("*/")
      ? (hourPart === "*" || h % parseInt(hourPart.slice(2)) === 0)
      : h === parseInt(hourPart);
    const matchDom = domPart === "*" || d === parseInt(domPart);
    const matchMon = monPart === "*" || mo === parseInt(monPart);
    const matchDow = dowPart === "*" || current.getDay() === parseInt(dowPart) ||
      (dowPart.includes("-") && checkRange(dowPart, current.getDay()));

    if (matchMin && matchHour && matchDom && matchMon && matchDow) {
      runs.push(new Date(current));
    }

    current.setMinutes(current.getMinutes() + 1);
  }

  return runs;
}

function checkRange(rangeStr: string, value: number): boolean {
  const parts = rangeStr.split("-").map(Number);
  if (parts.length === 2) {
    return value >= parts[0] && value <= parts[1];
  }
  return value === parts[0];
}

export default function CronGeneratorPage() {
  const [fields, setFields] = useState(["*", "*", "*", "*", "*"]);
  const [customCron, setCustomCron] = useState("");

  const cronExpression = customCron || fields.join(" ");

  const updateField = useCallback((index: number, value: string) => {
    setFields((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setCustomCron("");
  }, []);

  const applyPreset = useCallback((cron: string) => {
    setFields(cron.split(" "));
    setCustomCron("");
  }, []);

  const description = useMemo(() => {
    const parts = cronExpression.trim().split(/\s+/);
    return describeCron(parts);
  }, [cronExpression]);

  const nextRuns = useMemo(() => {
    return getNextRuns(cronExpression, 5);
  }, [cronExpression]);

  const copyCron = useCallback(async () => {
    await navigator.clipboard.writeText(cronExpression);
  }, [cronExpression]);

  return (
    <ToolPageLayout
      title="Cron Expression Generator"
      description="Build, understand, and test cron expressions with a visual helper and next run time preview."
    >
      <div className="space-y-6">
        {/* Presets */}
        <div>
          <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Common Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.cron}
                onClick={() => applyPreset(preset.cron)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                  cronExpression === preset.cron
                    ? "bg-primary text-white border-primary"
                    : "bg-input-bg border-input-border hover:border-primary/40 text-foreground"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Field Editors */}
        <div>
          <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Field Editor
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {FIELDS.map((field, i) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-zinc-500 mb-1">
                  {field.name}
                  <span className="text-zinc-400 ml-1">({field.range})</span>
                </label>
                <input
                  type="text"
                  value={fields[i]}
                  onChange={(e) => updateField(i, e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Expression */}
        <div>
          <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Or type a custom expression
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={customCron}
              onChange={(e) => setCustomCron(e.target.value)}
              placeholder="* * * * *"
              className="flex-1 px-4 py-2 font-mono text-sm border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Result */}
        <div className="bg-card-bg border border-card-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-zinc-500 mb-1">Cron Expression</div>
              <code className="text-2xl font-bold font-mono">{cronExpression}</code>
            </div>
            <button
              onClick={copyCron}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
            >
              Copy
            </button>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            {description}
          </p>

          {/* Next Runs */}
          {nextRuns.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Next 5 Run Times
              </h4>
              <div className="space-y-1">
                {nextRuns.map((run, i) => (
                  <div key={i} className="font-mono text-sm text-zinc-500">
                    {run.toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
