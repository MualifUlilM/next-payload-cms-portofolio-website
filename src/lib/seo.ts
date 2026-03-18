import type { Metadata } from "next";
import type { SiteSettings } from "@/types/payload";
import {
  BASE_URL,
  FALLBACK_META_DESCRIPTION,
  FALLBACK_SITE_NAME,
  getAbsoluteMediaUrl,
  getAbsoluteUrl,
} from "@/lib/site";

function getSiteName(settings?: SiteSettings | null) {
  return settings?.name || FALLBACK_SITE_NAME;
}

export function getDefaultMetaTitle(settings?: SiteSettings | null) {
  return (
    settings?.seo?.defaultMetaTitle ||
    `${getSiteName(settings)} — Fullstack Developer (Next.js & Payload CMS)`
  );
}

export function getDefaultMetaDescription(settings?: SiteSettings | null) {
  return settings?.seo?.defaultMetaDescription || FALLBACK_META_DESCRIPTION;
}

export function buildSiteMetadata(settings?: SiteSettings | null): Metadata {
  const defaultTitle = getDefaultMetaTitle(settings);
  const description = getDefaultMetaDescription(settings);
  const ogImageUrl =
    getAbsoluteMediaUrl(settings?.seo?.ogImage?.url) ||
    `${BASE_URL}/api/og?title=${encodeURIComponent(defaultTitle)}`;
  const faviconUrl = getAbsoluteMediaUrl(settings?.branding?.favicon?.url);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: `%s | ${defaultTitle}`,
      default: defaultTitle,
    },
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: getSiteName(settings),
      title: defaultTitle,
      description,
      url: BASE_URL,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: [ogImageUrl],
    },
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildMetadata({
  title,
  description,
  slug,
  ogImage,
  settings,
}: {
  title?: string;
  description?: string;
  slug?: string;
  ogImage?: string;
  settings?: SiteSettings | null;
}): Metadata {
  const metaTitle = title || getDefaultMetaTitle(settings);
  const metaDescription = description || getDefaultMetaDescription(settings);
  const url = slug ? getAbsoluteUrl(`/${slug.replace(/^\/+/, "")}`) : BASE_URL;

  const ogImageUrl =
    getAbsoluteMediaUrl(ogImage) ||
    getAbsoluteMediaUrl(settings?.seo?.ogImage?.url) ||
    `${BASE_URL}/api/og?title=${encodeURIComponent(metaTitle)}`;

  return {
    title: title || { absolute: metaTitle },
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
  };
}

export function buildPersonJsonLd(settings?: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: getSiteName(settings),
    url: BASE_URL,
    jobTitle: "Fullstack Developer",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Payload CMS",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    sameAs: [
      settings?.socialLinks?.github || process.env.NEXT_PUBLIC_GITHUB_URL,
      settings?.socialLinks?.linkedin || process.env.NEXT_PUBLIC_LINKEDIN_URL,
      settings?.socialLinks?.twitter || process.env.NEXT_PUBLIC_TWITTER_URL,
    ].filter(Boolean),
  };
}

export function buildWebsiteJsonLd(settings?: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getSiteName(settings),
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
  authorName,
}: {
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: getAbsoluteUrl(`/blog/${slug}`),
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName || FALLBACK_SITE_NAME,
      url: BASE_URL,
    },
    image: [
      getAbsoluteMediaUrl(image) ||
        `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
    ],
    publisher: {
      "@type": "Person",
      name: authorName || FALLBACK_SITE_NAME,
      url: BASE_URL,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  };
}
