import type { MetadataRoute } from "next";

const BASE_URL = "https://devtoolbox.dev";

const tools = [
  "/json-formatter",
  "/base64",
  "/uuid-generator",
  "/cron-generator",
  "/regex-tester",
];

const languages = ["en", "zh", "ja", "ko", "es", "fr", "de", "pt", "ru", "ar", "hi"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Tool pages (English default)
  tools.forEach((tool) => {
    routes.push({
      url: `${BASE_URL}${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // Language-specific pages
  languages.forEach((lang) => {
    routes.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });

    tools.forEach((tool) => {
      routes.push({
        url: `${BASE_URL}/${lang}${tool}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });
  });

  return routes;
}
