import { plainify } from "@/lib/utils/textConverter";

type SchemaLocale = "en" | "zh";

type LocalizedValue = Record<SchemaLocale, string>;

const SCHEMA_LANG_TAG: Record<SchemaLocale, string> = {
  en: "en",
  zh: "zh-Hans",
};

const ORG_PROFILE = {
  name: "MMC FP Sdn Bhd",
  alternateName: "MMC FP",
  legalName: "MMC FP Sdn Bhd",
  registrationNumber: "199701019804 (0435301-X)",
  licenseNumber: "CMSL: eCMSL/A0224/2008",
  description: {
    zh: "MMC FP Sdn Bhd 总部位于吉隆坡 Exchange 106 59.20 楼，专注以预算管理系统帮助企业建立必然增长的能力。",
    en: "MMC FP Sdn Bhd operates from Level 59.20, Exchange 106 in Kuala Lumpur and helps founders install budget-driven operating systems that turn growth into a repeatable capability.",
  } as LocalizedValue,
  tagline: {
    zh: "利润增长，连接资本",
    en: "Profit-focused growth that connects teams with capital",
  } as LocalizedValue,
  address: {
    streetAddress: "59.20, Exchange 106",
    addressLocality: "Kuala Lumpur",
    addressRegion: "Federal Territory of Kuala Lumpur",
    postalCode: "55188",
    addressCountry: "MY",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: ["Malaysia", "Singapore", "Greater China"],
};

const PLAN_TRANSLATIONS = {
  实战课程培训: {
    name: "Applied Growth Intensive",
    description:
      "Designed for teams that must align leadership thinking, learn proven growth playbooks, and leave with SOP-ready toolkits.",
    features: [
      "20 years of proven growth methodology",
      "Keeps leadership and execution teams aligned",
      "Hands-on simulations and case breakdowns",
      "Ready-to-use implementation worksheets",
    ],
    pricingNote: "Per headcount quotation focused on mastering the method",
  },
  深度咨询落地: {
    name: "Deep-Dive Consulting",
    description:
      "Ideal for companies that face concrete bottlenecks or transformation hurdles and need diagnostics plus turnkey solutions.",
    features: [
      "Enterprise-wide discovery and diagnostics",
      "Custom growth blueprint",
      "Org structure and incentive design",
      "Implementation support with retrospectives",
    ],
    pricingNote: "Project-based engagement with deliverable ownership",
  },
  年度顾问陪跑: {
    name: "Advisor-in-Residence",
    description:
      "Built for founders or executives who need a long-term external brain for calibration, decision support, and steady growth.",
    features: [
      "Monthly or quarterly business reviews",
      "1:1 coaching for owners and executives",
      "Decision risk assessment",
      "Dynamic strategy adjustments",
    ],
    pricingNote: "Quarterly retainer for long-term guidance",
  },
} satisfies Record<
  string,
  { name: string; description: string; features: string[]; pricingNote: string }
>;

const FAQ_TRANSLATIONS = {
  "你们和其他管理咨询公司有什么不同？": {
    question: "How is MMC FP different from other consultancies?",
    answer:
      "We focus on a single operating system: budget-driven management that converts incidental wins into repeatable growth. The methodology has been refined for 20+ years and is built so the entire leadership team can execute it end-to-end.",
  },
  "我们的公司规模不大，适合你们的服务吗？": {
    question: "Is this a fit for a smaller SME?",
    answer:
      "Yes. Our playbooks are designed for SME owners who juggle multiple roles. The system frees up founders, gives teams clarity, and installs a sustainable way to scale.",
  },
  "我们是服务业／制造业／贸易行业，你们的理论适用吗？": {
    question: "Does the methodology work for different industries?",
    answer:
      "It does. Regardless of industry, every business needs a way to set targets, manage cash, and align incentives. We customize the frameworks so they reflect the realities of your sector.",
  },
  "我没有财务背景，能听懂并使用你们的「预算管理」系统吗？": {
    question: "Can I run the budget system without a finance background?",
    answer:
      "Absolutely. We intentionally translate financial logic into plain business language and visuals so founders without accounting training can still think and act like CEOs.",
  },
  "咨询服务的流程是怎样的？大概需要多长时间？": {
    question: "What does the consulting process look like and how long does it take?",
    answer:
      "Engagements move through diagnosis, solution design, workshops and training, followed by a 3–6 month co-pilot phase to ensure execution stays on track.",
  },
  "你们的服务费用是如何计算的？": {
    question: "How do you calculate service fees?",
    answer:
      "Investment levels depend on project depth, advisor seniority, and duration. After the initial diagnosis we provide a detailed proposal that ties fees to expected ROI.",
  },
  "我如何能确定你们的服务是有效的？": {
    question: "How can I be sure the engagement will work?",
    answer:
      "The methodology has helped 200+ companies. Before kick-off we align on measurable KPIs such as profit, cash flow, or productivity so progress is transparent.",
  },
  "你们的团队成员都很年轻，经验足够吗？": {
    question: "Is the team experienced enough even though members are young?",
    answer:
      "We pair senior advisors who have 25+ years of experience with a younger execution squad. That mix keeps the playbooks battle-tested yet highly adaptable.",
  },
} satisfies Record<string, { question: string; answer: string }>;

const OFFICE_TRANSLATIONS = {
  "Exchange 106 总部": {
    name: "Exchange 106 Headquarters",
    description:
      "Level 59.20, Exchange 106, Tun Razak Exchange (TRX), 55188 Kuala Lumpur",
  },
};

const CONTACT_NOTES: LocalizedValue = {
  zh: "欢迎透过电话或 email 与 MMC FP 团队联系，我们会在 1 个工作日内回应。",
  en: "Reach out via phone or email and the MMC FP team will respond within one business day.",
};

const slugifyKey = (value?: string) =>
  value
    ? value
        .replace(/[^\p{Letter}\p{Number}]+/gu, "")
        .trim()
        .toLowerCase()
    : "";

const lookupTranslation = <T extends Record<string, any>>(
  dictionary: Record<string, T>,
  key?: string,
): T | undefined => {
  if (!key) return undefined;
  if (dictionary[key]) return dictionary[key];
  const normalized = slugifyKey(key);
  return Object.entries(dictionary).find(
    ([candidate]) => slugifyKey(candidate) === normalized,
  )?.[1];
};

export const getSchemaLocale = (locale?: string): SchemaLocale =>
  locale && locale.startsWith("zh") ? "zh" : "en";

export const getSchemaLanguageTag = (locale?: string) =>
  SCHEMA_LANG_TAG[getSchemaLocale(locale)];

export const createSchemaId = (baseUrl: string, fragment: string) =>
  `${baseUrl.replace(/\/$/, "")}#${fragment}`;

export type PricingPlanInput = {
  name: string;
  description?: string;
  price?: Array<{
    type?: string;
    value?: string;
  }>;
  features?: string[];
  button?: { url?: string };
};

export type FAQCategoryInput = {
  label?: string;
  list: Array<{ title: string; content: string }>;
};

export type BreadcrumbItemInput = {
  label?: string;
  href?: string;
};

export type TeamMemberInput = {
  name?: string;
  role?: string;
  image?: string;
  description?: string;
  social?: {
    enable?: boolean;
    url?: string;
    list?: Array<{
      enable?: boolean;
      url?: string;
    }>;
  };
};

export const buildOrganizationSchema = ({
  locale,
  siteUrl,
  logo,
  sameAs = [],
}: {
  locale?: string;
  siteUrl: string;
  logo: string;
  sameAs?: string[];
}) => {
  const lang = getSchemaLocale(locale);
  return {
    "@type": "Organization",
    "@id": createSchemaId(siteUrl, "organization"),
    name: ORG_PROFILE.name,
    alternateName: ORG_PROFILE.alternateName,
    legalName: ORG_PROFILE.legalName,
    description: ORG_PROFILE.description[lang],
    slogan: ORG_PROFILE.tagline[lang],
    url: siteUrl,
    logo,
    foundingLocation: ORG_PROFILE.address.addressLocality,
    taxID: ORG_PROFILE.registrationNumber,
    leiCode: ORG_PROFILE.licenseNumber,
    areaServed: ORG_PROFILE.areaServed,
    availableLanguage: Object.values(SCHEMA_LANG_TAG),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+60 11-2736 8039",
        email: "admin@mmcfin.com",
        areaServed: ORG_PROFILE.areaServed,
        availableLanguage: Object.values(SCHEMA_LANG_TAG),
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...ORG_PROFILE.address,
    },
    sameAs,
  };
};

export const buildWebsiteSchema = ({
  locale,
  siteUrl,
}: {
  locale?: string;
  siteUrl: string;
}) => ({
  "@type": "WebSite",
  "@id": createSchemaId(siteUrl, "website"),
  url: siteUrl,
  name: `${ORG_PROFILE.name} ｜ ${ORG_PROFILE.tagline[getSchemaLocale(locale)]}`,
  inLanguage: getSchemaLanguageTag(locale),
  description: ORG_PROFILE.description[getSchemaLocale(locale)],
  potentialAction: [
    {
      "@type": "ContactAction",
      name:
        getSchemaLocale(locale) === "zh" ? "预约咨询" : "Book a strategic call",
      target: `${siteUrl.replace(/\/$/, "")}/contact/`,
    },
  ],
  publisher: {
    "@id": createSchemaId(siteUrl, "organization"),
  },
});

export const buildContactSchema = ({
  locale,
  url,
  siteUrl,
  channels = [],
}: {
  locale?: string;
  url: string;
  siteUrl: string;
  channels?: Array<{ label?: string; value?: string }>;
}) => {
  const lang = getSchemaLocale(locale);
  const contactPoint = channels
    .map((channel) => {
      const value = channel.value || "";
      const isEmail = value.includes("@");
      const normalizedPhone = value.replace(/[^\d+]/g, "");
      const hasPhone =
        !isEmail && /(\+?\d{5,}|\d{2,4}[-\s]\d{3,})/.test(normalizedPhone);

      return {
        "@type": "ContactPoint",
        contactType: channel.label || "customer support",
        telephone: hasPhone ? normalizedPhone : undefined,
        email: isEmail ? value : undefined,
        areaServed: ORG_PROFILE.areaServed,
        availableLanguage: Object.values(SCHEMA_LANG_TAG),
      };
    })
    .filter((point) => point.telephone || point.email);

  return {
    "@type": "ContactPage",
    url,
    inLanguage: getSchemaLanguageTag(locale),
    description: CONTACT_NOTES[lang],
    about: {
      "@id": createSchemaId(siteUrl, "organization"),
    },
    contactPoint,
  };
};

export const buildOfficeSchema = ({
  locale,
  url,
  office,
}: {
  locale?: string;
  url: string;
  office?: { title?: string; content?: string; image?: string };
}) => {
  const lang = getSchemaLocale(locale);
  const officeCopy = lookupTranslation(
    OFFICE_TRANSLATIONS,
    office?.title || "Exchange 106 总部",
  );
  return {
    "@type": "Place",
    "@id": createSchemaId(url, "exchange-106"),
    name: lang === "zh" ? office?.title || "Exchange 106 总部" : officeCopy?.name,
    description:
      lang === "zh"
        ? plainify(
            office?.content ||
              "59.20, Exchange 106, Tun Razak Exchange (TRX), 55188 Kuala Lumpur",
          )
        : officeCopy?.description || plainify(office?.content || ""),
    address: {
      "@type": "PostalAddress",
      ...ORG_PROFILE.address,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Tun Razak Exchange (TRX)",
    },
    hasMap: "https://maps.app.goo.gl/1x6YhFttSjf6QkUM7",
    image: office?.image,
  };
};

export const buildServiceSchemas = ({
  locale,
  plans,
  baseUrl,
}: {
  locale?: string;
  plans: PricingPlanInput[];
  baseUrl: string;
}) => {
  const lang = getSchemaLocale(locale);
  return plans
    .filter((plan) => plan?.name)
    .map((plan, index) => {
      const translation = lookupTranslation(PLAN_TRANSLATIONS, plan.name);
      const localizedName = lang === "zh" ? plan.name : translation?.name || plan.name;
      const localizedDescription =
        lang === "zh" ? plan.description : translation?.description || plan.description;
      const additionalProperty = (lang === "zh"
        ? plan.features || []
        : translation?.features || plan.features || []
      ).map((feature, order) => ({
        "@type": "PropertyValue",
        name: feature,
        value: order + 1,
      }));

      const priceInfo = plan.price?.[0];

      return {
        "@type": "Service",
        "@id": createSchemaId(baseUrl, `service-plan-${index + 1}`),
        name: localizedName,
        description: localizedDescription && plainify(localizedDescription),
        serviceType: "Management Consulting",
        provider: {
          "@id": createSchemaId(baseUrl, "organization"),
        },
        areaServed: ORG_PROFILE.areaServed,
        offers: [
          {
            "@type": "Offer",
            priceCurrency: "MYR",
            price:
              priceInfo && Number.isFinite(Number(priceInfo.value))
                ? Number(priceInfo.value)
                : undefined,
            priceSpecification: priceInfo && {
              "@type": "PriceSpecification",
              description:
                lang === "zh"
                  ? `${priceInfo.type || ""}${priceInfo.value ? `｜${priceInfo.value}` : ""}`
                  : translation?.pricingNote,
            },
            url: plan.button?.url
              ? new URL(plan.button.url, baseUrl).href
              : `${baseUrl}/contact/`,
            availability: "https://schema.org/PreOrder",
            eligibleQuantity: priceInfo?.type && {
              "@type": "QuantitativeValue",
              unitText: priceInfo.type,
            },
          },
        ].filter(Boolean),
        additionalProperty,
      };
    });
};

export const buildFaqSchema = ({
  locale,
  categories,
  url,
  siteUrl,
}: {
  locale?: string;
  categories: FAQCategoryInput[];
  url: string;
  siteUrl: string;
}) => {
  const lang = getSchemaLocale(locale);
  const mainEntity = categories.flatMap((category) =>
    category.list.map((item) => {
      const translation = lookupTranslation(FAQ_TRANSLATIONS, item.title);
      const question = lang === "zh" ? item.title : translation?.question || item.title;
      const answerText =
        lang === "zh"
          ? plainify(item.content)
          : translation?.answer || plainify(item.content);

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answerText,
        },
      };
    }),
  );

  return {
    "@type": "FAQPage",
    "@id": createSchemaId(url, "faq"),
    mainEntity,
    inLanguage: getSchemaLanguageTag(locale),
    about: {
      "@id": createSchemaId(siteUrl, "organization"),
    },
  };
};

export const buildArticleSchema = ({
  locale,
  article,
  url,
  image,
  siteUrl,
}: {
  locale?: string;
  article: {
    title: string;
    excerpt?: string;
    author?: string;
    date?: string;
    categories?: string[];
  };
  url: string;
  image?: string;
  siteUrl: string;
}) => ({
  "@type": "Article",
  "@id": createSchemaId(url, "article"),
  headline: article.title,
  description: article.excerpt,
  datePublished: article.date,
  dateModified: article.date,
  author: {
    "@type": "Person",
    name: article.author,
  },
  publisher: {
    "@id": createSchemaId(siteUrl, "organization"),
  },
  image,
  keywords: article.categories,
  inLanguage: getSchemaLanguageTag(locale),
  mainEntityOfPage: url,
});

export const buildBreadcrumbSchema = ({
  locale,
  siteUrl,
  items,
}: {
  locale?: string;
  siteUrl: string;
  items: BreadcrumbItemInput[];
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const itemListElement = items
    .filter((item) => item.label && item.href)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: plainify(item.label || ""),
      item: new URL(item.href as string, siteUrl).href,
    }))
    .filter((entry) => entry.name && entry.item);

  if (itemListElement.length < 2) {
    return null;
  }

  return {
    "@type": "BreadcrumbList",
    "@id": createSchemaId(siteUrl, `breadcrumbs-${getSchemaLocale(locale)}`),
    inLanguage: getSchemaLanguageTag(locale),
    itemListElement,
  };
};

export const buildAboutPageSchema = ({
  locale,
  siteUrl,
  url,
  title,
  description,
}: {
  locale?: string;
  siteUrl: string;
  url: string;
  title?: string;
  description?: string;
}) => ({
  "@type": "AboutPage",
  "@id": createSchemaId(url, "about"),
  url,
  name: title || "About MMC FP",
  description: description || ORG_PROFILE.description[getSchemaLocale(locale)],
  inLanguage: getSchemaLanguageTag(locale),
  about: {
    "@id": createSchemaId(siteUrl, "organization"),
  },
  mainEntity: {
    "@id": createSchemaId(siteUrl, "organization"),
  },
});

const extractSocialLinks = (member: TeamMemberInput) => {
  if (!member.social) return [];

  if (Array.isArray(member.social)) {
    return member.social
      .filter((link) => link?.url)
      .map((link) => link.url as string)
      .filter(Boolean);
  }

  if (member.social.list) {
    return member.social.list
      .filter((link) => link?.enable && link?.url)
      .map((link) => link.url as string)
      .filter(Boolean);
  }

  return member.social.url ? [member.social.url] : [];
};

export const buildTeamSchema = ({
  locale,
  siteUrl,
  url,
  title,
  description,
  members,
}: {
  locale?: string;
  siteUrl: string;
  url: string;
  title?: string;
  description?: string;
  members: TeamMemberInput[];
}) => {
  if (!members || members.length === 0) {
    return null;
  }

  const inLanguage = getSchemaLanguageTag(locale);
  const personNodes = members
    .filter((member) => member?.name)
    .map((member, index) => {
      const memberId = createSchemaId(
        siteUrl,
        `team-member-${slugifyKey(member?.name) || index + 1}`,
      );
      const socialLinks = extractSocialLinks(member);

      return {
        "@type": "Person",
        "@id": memberId,
        name: member?.name,
        jobTitle: member?.role,
        description: member?.description && plainify(member.description),
        image: member?.image ? new URL(member.image, siteUrl).href : undefined,
        worksFor: {
          "@id": createSchemaId(siteUrl, "organization"),
        },
        sameAs: socialLinks.length ? socialLinks : undefined,
      };
    })
    .filter((node) => node.name);

  if (personNodes.length === 0) {
    return null;
  }

  const itemListId = createSchemaId(url, "team-item-list");

  const teamPageNode = {
    "@type": "AboutPage",
    "@id": createSchemaId(url, "team"),
    url,
    name: title || "Leadership & Team",
    description:
      description ||
      "Meet the leadership team guiding MMC FP and delivering measurable growth outcomes.",
    inLanguage,
    about: {
      "@id": createSchemaId(siteUrl, "organization"),
    },
    mainEntity: {
      "@id": itemListId,
    },
  };

  const itemListNode = {
    "@type": "ItemList",
    "@id": itemListId,
    inLanguage,
    itemListElement: personNodes.map((person, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: person["@id"],
    })),
  };

  return [teamPageNode, itemListNode, ...personNodes];
};

