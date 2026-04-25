import { locales, defaultLocale, type Locale, getDictionary } from "@/i18n/dictionaries";
import JsonFormatterClient from "@/app/json-formatter/page";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);
  const SITE_URL = "https://devtoolbox-ivory.vercel.app";

  return {
    title: dict.jsonFormatter,
    description: dict.jsonFormatterDesc,
    alternates: {
      canonical: `/${locale}/json-formatter`,
    },
  };
}

export default async function JsonFormatterLangPage({ params }: { params: Promise<{ lang: string }> }) {
  return <JsonFormatterClient />;
}
