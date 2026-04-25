import { getDictionary, type Locale } from "@/i18n/dictionaries";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-card-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          DevToolbox — {dict.privacyFirstDesc}{" "}
          <span className="text-zinc-400">{dict.lightningFastDesc}</span>
        </p>
      </div>
    </footer>
  );
}
