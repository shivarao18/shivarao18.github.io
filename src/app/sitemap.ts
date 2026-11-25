import type { MetadataRoute } from "next";
import { projectHref, projects, SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-22");
  return [
    { url: `${SITE_URL}/`, lastModified },
    ...projects.map((project) => ({
      url: `${SITE_URL}${projectHref(project.slug)}`,
      lastModified,
    })),
  ];
}
