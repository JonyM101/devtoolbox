import Link from "next/link";
import { getDictionary, type Locale } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const tools = [
    { name: dict.jsonFormatter, href: `/${locale}/json-formatter` },
    { name: dict.base64Encoder, href: `/${locale}/base64` },
    { name: dict.uuidGenerator, href: `/${locale}/uuid-generator` },
    { name: dict.cronGenerator, href: `/${locale}/cron-generator` },
    { name: dict.regexTester, href: `/${locale}/regex-tester` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-white text-xs font-bold">
            DT
          </span>
          DevToolbox
        </Link>
        <nav className="hidden sm:flex items-center gap-1">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              {tool.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          {/* Mobile menu */}
          <nav className="sm:hidden flex items-center gap-1 overflow-x-auto">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-2 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-foreground whitespace-nowrap"
              >
                {tool.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
