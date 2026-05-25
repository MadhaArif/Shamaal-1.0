import { MetadataRoute } from "next";

const BASE_URL = "https://www.shamaaltourism.com";

const DESTINATION_SLUGS = ["hunza", "skardu", "fairy-meadows", "swat", "chitral", "naran", "gilgit"];
const TOUR_SLUGS = [
  "kashmir-neelum-valley", "naran-valley", "hunza-valley",
  "fairy-meadows-tour", "skardu-tour"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/tours`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/destinations`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/custom-tours`, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const destinationPages = DESTINATION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/destinations/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const tourPages = TOUR_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tours/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...destinationPages, ...tourPages];
}
