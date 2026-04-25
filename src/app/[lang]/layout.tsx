import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { locales, defaultLocale, getDictionary, type Locale } from "@/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    metadataBase: new URL(SITE_URL),
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "CD_qK1jTsLyaaJcoHAeZfvoTP1WJxOvF1kNXLz59Md4",
    },
  };
}

// Schema.org structured data for the website
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevToolbox",
  url: SITE_URL,
  description: "Free online developer tools for everyday coding tasks. No signup, no tracking.",
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevToolbox",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "JSON Formatter and Validator",
    "Base64 Encoder and Decoder",
    "UUID v4 Generator",
    "Cron Expression Generator",
    "Regular Expression Tester",
  ],
};

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GoogleAnalytics gaId="G-EH0SKY28M4" />
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
