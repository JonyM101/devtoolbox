import { locales, defaultLocale, type Locale, getDictionary } from "@/i18n/dictionaries";
import Base64Client from "@/app/base64/page";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.base64Encoder,
    description: dict.base64EncoderDesc,
    alternates: {
      canonical: `/${locale}/base64`,
    },
  };
}

export default async function Base64LangPage({ params }: { params: Promise<{ lang: string }> }) {
  return <Base64Client />;
}
