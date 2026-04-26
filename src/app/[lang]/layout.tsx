import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { locales, defaultLocale, getDictionary, type Locale } from "@/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdUnit";

const SITE_URL = "https://devtoolbox-ivory.vercel.app";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dict = getDictionary(locale);

  const localeAlternates: Record<string, string> = {};
  for (const l of locales) {
    localeAlternates[l] = `/${l}`;
  }

  return {
    title: {
      default: `${dict.siteTitle} - Free Online Developer Tools`,
      template: `%s | ${dict.siteTitle}`,
    },
    description: dict.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: localeAlternates,
    },
    openGraph: {
      title: `${dict.siteTitle} - Free Online Developer Tools`,
      description: dict.siteDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: dict.siteTitle,
      locale: locale === "zh" ? "zh_CN" : locale === "ja" ? "ja_JP" : locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;

  return (
    <>
      <GoogleAnalytics gaId="G-EH0SKY28M4" />
      <Header locale={locale} />
      <main className="flex-1">
        {children}
        <AdBanner className="mt-8" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
