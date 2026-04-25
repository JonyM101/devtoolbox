import { locales, defaultLocale, type Locale, getDictionary } from "@/i18n/dictionaries";
import UuidGeneratorClient from "@/app/uuid-generator/page";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.uuidGenerator,
    description: dict.uuidGeneratorDesc,
    alternates: {
      canonical: `/${locale}/uuid-generator`,
    },
  };
}

export default async function UuidGeneratorLangPage({ params }: { params: Promise<{ lang: string }> }) {
  return <UuidGeneratorClient />;
}
