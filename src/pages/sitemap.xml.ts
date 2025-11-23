import type { APIRoute } from "astro";
import { getCollectionCTM } from "@/lib/contentParser.astro";
import { supportedLanguages, getLocaleUrlCTM } from "@/lib/utils/i18nUtils.ts";
import { getEntryCTM } from "@/lib/contentParser.astro";
import config from ".astro/config.generated.json" with { type: "json" };

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  priority: number;
  changefreq?: string;
}

/**
 * Format date to ISO 8601 format for sitemap (using +00:00 timezone format)
 */
function formatDate(date: Date | string | undefined): string | undefined {
  if (!date) return undefined;
  
  let dateObj: Date;
  
  if (typeof date === "string") {
    // Handle YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return `${date}T00:00:00+00:00`;
    }
    // Try to parse as ISO string or other date format
    dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return undefined;
    }
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return undefined;
  }
  
  // Convert to ISO string and replace Z with +00:00 for consistency
  return dateObj.toISOString().replace("Z", "+00:00");
}

/**
 * Get priority for a URL based on its path
 */
function getPriority(url: string): number {
  // Homepage gets highest priority
  if (url === "/" || url === config.site.baseUrl || url === `${config.site.baseUrl}/`) {
    return 1.0;
  }
  
  // Main pages get high priority
  const mainPages = ["/about", "/contact", "/pricing", "/services", "/faq", "/team"];
  if (mainPages.some(page => url.includes(page))) {
    return 0.8;
  }
  
  // Service detail pages get high priority
  if (url.includes("/services/") && !url.endsWith("/services/") && !url.endsWith("/services")) {
    return 0.8;
  }
  
  // Blog posts and case studies get lower priority
  if (url.includes("/blog/") || url.includes("/case-studies/")) {
    return 0.6;
  }
  
  // Default priority for other pages
  return 0.7;
}

/**
 * Generate sitemap entries for content collections
 */
async function generateCollectionEntries(
  collectionName: "blog" | "services" | "case-studies" | "pages",
  lang: { languageCode: string; contentDir: string },
  baseUrl: string,
): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  
  try {
    const items = await getCollectionCTM(collectionName, lang.languageCode);
    
    for (const item of items) {
      // Skip drafts and excluded items
      if (item.data.draft || item.data.excludeFromSitemap) {
        continue;
      }
      
      // Generate slug
      const slug = item.data?.customSlug ||
        item.id
          .replace(/\.mdx?|\.md/g, "")
          .split("/")
          .pop();
      
      if (!slug) continue;
      
      // Generate URL based on collection type
      let relativePath = "";
      if (collectionName === "blog") {
        relativePath = `/blog/${slug}`;
      } else if (collectionName === "services") {
        relativePath = `/services/${slug}`;
      } else if (collectionName === "case-studies") {
        relativePath = `/case-studies/${slug}`;
      } else if (collectionName === "pages") {
        relativePath = `/${slug}`;
      }
      
      // Generate localized URL
      const localizedUrl = getLocaleUrlCTM(
        relativePath,
        lang.languageCode === config.settings.multilingual.defaultLanguage && !config.settings.multilingual.showDefaultLangInUrl
          ? undefined
          : lang.languageCode,
      );
      
      // Convert to absolute URL
      const absoluteUrl = localizedUrl.startsWith("http")
        ? localizedUrl
        : `${baseUrl}${localizedUrl.startsWith("/") ? "" : "/"}${localizedUrl}`;
      
      // Format lastmod from date
      const lastmod = formatDate(item.data.date);
      
      entries.push({
        loc: absoluteUrl,
        lastmod,
        priority: getPriority(absoluteUrl),
        changefreq: collectionName === "blog" ? "weekly" : "monthly",
      });
    }
  } catch (error) {
    console.error(`Error generating entries for ${collectionName}:`, error);
  }
  
  return entries;
}

/**
 * Generate sitemap entries for static pages
 */
async function generateStaticPageEntries(
  lang: { languageCode: string; contentDir: string },
  baseUrl: string,
): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  
  // Static pages that use getEntryCTM
  const staticPages = [
    { path: "/", collection: "homepage" as const, subCollection: "-index" },
    { path: "/about", collection: "about" as const, subCollection: "-index" },
    { path: "/contact", collection: "contact" as const, subCollection: "-index" },
    { path: "/pricing", collection: "pricing" as const, subCollection: "-index" },
    { path: "/faq", collection: "faq" as const, subCollection: "-index" },
    { path: "/team", collection: "team" as const, subCollection: "-index" },
  ];
  
  for (const page of staticPages) {
    try {
      const entry = await getEntryCTM(page.collection, page.subCollection, lang.languageCode);
      
      if (!entry || entry.data.draft || entry.data.excludeFromSitemap) {
        continue;
      }
      
      // Generate localized URL
      const localizedUrl = getLocaleUrlCTM(
        page.path,
        lang.languageCode === config.settings.multilingual.defaultLanguage && !config.settings.multilingual.showDefaultLangInUrl
          ? undefined
          : lang.languageCode,
      );
      
      // Convert to absolute URL
      const absoluteUrl = localizedUrl.startsWith("http")
        ? localizedUrl
        : `${baseUrl}${localizedUrl.startsWith("/") ? "" : "/"}${localizedUrl}`;
      
      // Format lastmod from date
      const lastmod = formatDate(entry.data.date);
      
      entries.push({
        loc: absoluteUrl,
        lastmod,
        priority: getPriority(absoluteUrl),
        changefreq: "monthly",
      });
    } catch (error) {
      // Entry might not exist for this language, skip silently
      continue;
    }
  }
  
  // Add career index page if it exists
  try {
    const careerIndex = await getEntryCTM("career", "-index", lang.languageCode);
    if (careerIndex && !careerIndex.data.draft && !careerIndex.data.excludeFromSitemap) {
      const localizedUrl = getLocaleUrlCTM(
        "/career",
        lang.languageCode === config.settings.multilingual.defaultLanguage && !config.settings.multilingual.showDefaultLangInUrl
          ? undefined
          : lang.languageCode,
      );
      const absoluteUrl = localizedUrl.startsWith("http")
        ? localizedUrl
        : `${baseUrl}${localizedUrl.startsWith("/") ? "" : "/"}${localizedUrl}`;
      
      entries.push({
        loc: absoluteUrl,
        lastmod: formatDate(careerIndex.data.date),
        priority: getPriority(absoluteUrl),
        changefreq: "monthly",
      });
    }
  } catch (error) {
    // Career index might not exist, skip silently
  }
  
  return entries;
}

/**
 * Generate XML sitemap string
 */
function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      let url = `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>`;
      
      if (entry.lastmod) {
        url += `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`;
      }
      
      url += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
      
      if (entry.changefreq) {
        url += `\n    <changefreq>${entry.changefreq}</changefreq>`;
      }
      
      url += `\n  </url>`;
      return url;
    })
    .join("\n");
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async () => {
  const baseUrl = config.site.baseUrl || "http://examplesite.com";
  const allEntries: SitemapEntry[] = [];
  
  // Generate entries for each supported language
  for (const lang of supportedLanguages) {
    // Static pages
    const staticEntries = await generateStaticPageEntries(lang, baseUrl);
    allEntries.push(...staticEntries);
    
    // Content collections
    const blogEntries = await generateCollectionEntries("blog", lang, baseUrl);
    allEntries.push(...blogEntries);
    
    const servicesEntries = await generateCollectionEntries("services", lang, baseUrl);
    allEntries.push(...servicesEntries);
    
    const caseStudiesEntries = await generateCollectionEntries("case-studies", lang, baseUrl);
    allEntries.push(...caseStudiesEntries);
    
    const pagesEntries = await generateCollectionEntries("pages", lang, baseUrl);
    allEntries.push(...pagesEntries);
  }
  
  // Remove duplicates (in case of overlapping URLs)
  const uniqueEntries = Array.from(
    new Map(allEntries.map((entry) => [entry.loc, entry])).values()
  );
  
  // Sort entries by URL for consistent output
  uniqueEntries.sort((a, b) => a.loc.localeCompare(b.loc));
  
  // Generate XML
  const sitemap = generateSitemapXML(uniqueEntries);
  
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};

