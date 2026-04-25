import Link from "next/link";

const tools = [
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting",
    href: "/json-formatter",
    icon: "{ }",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings instantly",
    href: "/base64",
    icon: "B64",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) in bulk for your applications",
    href: "/uuid-generator",
    icon: "UID",
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    name: "Cron Expression Generator",
    description: "Build and understand cron expressions with a visual helper",
    href: "/cron-generator",
    icon: "⏰",
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions with real-time matching and group capture",
    href: "/regex-tester",
    icon: ".*+",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Developer Toolbox
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Free, fast, and privacy-friendly online tools for everyday coding tasks.
          No signup. No tracking. Works offline.
        </p>
      </section>

      {/* Tools Grid */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
          All Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold mb-3 ${tool.color}`}
              >
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-semibold mb-1">Privacy First</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            All processing happens in your browser. No data sent to servers.
          </p>
        </div>
        <div>
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold mb-1">Lightning Fast</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No server roundtrips. Instant results as you type.
          </p>
        </div>
        <div>
          <div className="text-2xl mb-2">📱</div>
          <h3 className="font-semibold mb-1">Works Everywhere</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Responsive design that works on desktop, tablet, and mobile.
          </p>
        </div>
      </section>
    </div>
  );
}
