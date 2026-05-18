import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/book/", "/_next/"],
      },
    ],
    sitemap: "https://www.shamaaltourism.com/sitemap.xml",
  };
}
