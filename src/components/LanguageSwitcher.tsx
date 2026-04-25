"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/dictionaries";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLocaleChange(newLocale: Locale) {
    // Replace the locale segment in the current path
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    // Set cookie for future visits
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.push(newPath);
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 px-2 py-1 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Switch language"
      >
        <span>🌐</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-1">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                locale === currentLocale
                  ? "text-primary font-semibold bg-zinc-50 dark:bg-zinc-800"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
