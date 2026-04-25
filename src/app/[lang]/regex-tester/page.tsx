import { locales, defaultLocale, type Locale, getDictionary } from "@/i18n/dictionaries";
import RegexTesterClient from "@/app/regex-tester/page";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.regexTester,
    description: dict.regexTesterDesc,
    alternates: {
      canonical: `/${locale}/regex-tester`,
    },
  };
}

export default async function RegexTesterLangPage({ params }: { params: Promise<{ lang: string }> }) {
  return <RegexTesterClient />;
}
