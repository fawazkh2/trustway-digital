import type { MetadataRoute } from "next";
import { concepts } from "@/lib/concepts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://trustway.digital", changeFrequency: "monthly", priority: 1 },
    { url: "https://trustway.digital/portfolio", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://trustway.digital/preise", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://trustway.digital/kontakt", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://trustway.digital/project-request", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://trustway.digital/case-studies", changeFrequency: "monthly", priority: 0.8 },
    ...concepts.map((concept) => ({ url: `https://trustway.digital/portfolio/${concept.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
