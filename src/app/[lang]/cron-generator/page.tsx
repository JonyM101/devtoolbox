import { locales, defaultLocale, type Locale, getDictionary } from "@/i18n/dictionaries";
import { CronGenerator } from "@/components/tools/CronGenerator";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.cronGenerator,
    description: dict.cronGeneratorDesc,
    alternates: {
      canonical: `/${locale}/cron-generator`,
    },
  };
}

export default async function CronGeneratorLangPage() {
  return <CronGenerator />;
}
