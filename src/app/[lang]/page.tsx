import Link from "next/link";
import { locales, defaultLocale, getDictionary, type Locale } from "@/i18n/dictionaries";
import { AdBanner, AdInArticle } from "@/components/AdUnit";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  const tools = [
    {
      name: dict.jsonFormatter,
      description: dict.jsonFormatterDesc,
      href: `/${locale}/json-formatter`,
      icon: "{ }",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      name: dict.base64Encoder,
      description: dict.base64EncoderDesc,
      href: `/${locale}/base64`,
      icon: "B64",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      name: dict.uuidGenerator,
      description: dict.uuidGeneratorDesc,
      href: `/${locale}/uuid-generator`,
      icon: "UID",
      color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    },
    {
      name: dict.cronGenerator,
      description: dict.cronGeneratorDesc,
      href: `/${locale}/cron-generator`,
      icon: "⏰",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    },
    {
      name: dict.regexTester,
      description: dict.regexTesterDesc,
      href: `/${locale}/regex-tester`,
      icon: ".*+",
      color: "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Banner Ad */}
      <AdBanner className="mb-8" />

      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {dict.siteTitle}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {dict.siteDescription}
        </p>
      </section>

      {/* Tools Grid */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
          {dict.allTools}
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

      {/* In-content Ad */}
      <AdInArticle className="my-8" />

      {/* Features */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-semibold mb-1">{dict.privacyFirst}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {dict.privacyFirstDesc}
          </p>
        </div>
        <div>
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold mb-1">{dict.lightningFast}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {dict.lightningFastDesc}
          </p>
        </div>
        <div>
          <div className="text-2xl mb-2">📱</div>
          <h3 className="font-semibold mb-1">{dict.worksEverywhere}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {dict.worksEverywhereDesc}
          </p>
        </div>
      </section>
    </div>
  );
}
