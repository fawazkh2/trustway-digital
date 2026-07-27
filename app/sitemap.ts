import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://trustway.digital", changeFrequency: "monthly", priority: 1 },
    { url: "https://trustway.digital/portfolio", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://trustway.digital/project-request", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://trustway.digital/case-studies", changeFrequency: "monthly", priority: 0.8 },
  ];
}
