/**
 * JSON-LD Generator
 * Generates appropriate JSON-LD data based on the page type and provided content
 * Generates JSON-LD data that search engines like Google, Bing, and DuckDuckGo can use to better understand the content of the page.
 * This can improve the page's visibility in search engine results and provide users with additional information about the page.
 */
import { absoluteUrl } from "./absoluteUrl";
import { getLocaleUrlCTM } from "@/lib/utils/i18nUtils";
import trailingSlashChecker from "./trailingSlashChecker";
import social from "@/config/social.json";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  createSchemaId,
  getSchemaLanguageTag,
  getSchemaLocale,
} from "./schema";

// This component dynamically generates appropriate JSON-LD data based on the page type
export type JSONLDProps = {
  canonical?: string; // Canonical URL of the page, used to determine page type
  title?: string; // Title of the page
  description?: string; // Description of the page
  image?: string; // Image URL for blog posts, case studies, or team members
  categories?: string[]; // Categories or tags for blog posts or case studies
  author?: string; // Author for blog posts or case studies
  pageType?: string; // Page type
  schemaNodes?: Record<string, any>[];

  [key: string]: any;
};

export default function JsonLdGenerator(content: JSONLDProps, Astro: any) {
  let {
    canonical = "/",
    title = "",
    description = "",
    image = "",
    pageType = "",
    lang,
    alternateLangs = [], // Array of alternate language URLs
    config,
    schemaNodes = [],
  } = content || {};

  if (!lang) {
    lang = config.settings.multilingual.defaultLanguage;
  }
  const resolvedSchemaNodes = Array.isArray(schemaNodes) ? schemaNodes : [];

  const schemaLocale = getSchemaLocale(lang);
  const inLanguage = getSchemaLanguageTag(lang);
  const siteUrl = trailingSlashChecker(new URL("/", Astro.url).href);
  const organizationLogo = absoluteUrl(config.site.logo, Astro);
  const sameAs = social.main.filter((item) => item.enable).map((item) => item.url);
  const canonicalUrl = canonical?.startsWith("http")
    ? canonical
    : new URL(canonical || Astro.url.href, Astro.url).href;
  const pageImage = image;

  const webPageNode: Record<string, any> = {
    "@type": pageType || "WebPage",
    "@id": createSchemaId(canonicalUrl, "webpage"),
    url: canonicalUrl,
    name: title,
    description,
    inLanguage,
    isPartOf: {
      "@id": createSchemaId(siteUrl, "website"),
    },
    publisher: {
      "@id": createSchemaId(siteUrl, "organization"),
    },
  };

  if (pageImage) {
    webPageNode.primaryImageOfPage = {
      "@type": "ImageObject",
      url: pageImage,
    };
    webPageNode.image = pageImage;
  }

  if (content?.date) {
    webPageNode.datePublished = content.date;
    webPageNode.dateModified = content.date;
  }

  // Add alternate languages if provided
  if (alternateLangs.length > 0) {
    webPageNode.alternateLanguage = alternateLangs
      .filter((alt: any) => Astro.currentLocale !== alt.languageCode)
      .map((alt: any) => ({
        "@type": "WebPage",
        url: getLocaleUrlCTM(canonical, alt.languageCode),
        inLanguage: alt.languageCode,
      }));
  }

  const graphNodes = [
    webPageNode,
    buildWebsiteSchema({
      locale: schemaLocale,
      siteUrl,
    }),
    buildOrganizationSchema({
      locale: schemaLocale,
      siteUrl,
      logo: organizationLogo,
      sameAs,
    }),
    ...resolvedSchemaNodes,
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graphNodes,
  };
}
