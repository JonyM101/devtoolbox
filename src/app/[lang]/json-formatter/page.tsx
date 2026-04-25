import { locales, defaultLocale, type Locale, getDictionary } from "@/i18n/dictionaries";
import { JsonFormatter } from "@/components/tools/JsonFormatter";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.jsonFormatter,
    description: dict.jsonFormatterDesc,
    alternates: {
      canonical: `/${locale}/json-formatter`,
    },
  };
}

export default async function JsonFormatterLangPage() {
  return <JsonFormatter />;
}
