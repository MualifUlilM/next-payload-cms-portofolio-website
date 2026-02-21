import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Your Name";

export function buildMetadata({
  title,
  description,
  slug,
  ogImage,
}: {
  title?: string;
  description?: string;
  slug?: string;
  ogImage?: string;
}): Metadata {
  const metaTitle = title
    ? `${title} | ${SITE_NAME} — Fullstack Developer`
    : `${SITE_NAME} — Fullstack Developer (Next.js & Payload CMS)`;

  const metaDescription =
    description ||
    "Fullstack developer specializing in Next.js, Supabase, and Payload CMS. Building fast, maintainable web products for US and EU teams.";

  const url = slug ? `${BASE_URL}/${slug}` : BASE_URL;

  const ogImageUrl =
    ogImage ||
    `${BASE_URL}/api/og?title=${encodeURIComponent(metaTitle)}`;

  return {
    title: metaTitle,
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

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
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
    process.env.NEXT_PUBLIC_GITHUB_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
  ].filter(Boolean),
};

export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
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
    url: `${BASE_URL}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: authorName || SITE_NAME,
      url: BASE_URL,
    },
    image: image
      ? [image]
      : [`${BASE_URL}/api/og?title=${encodeURIComponent(title)}`],
    publisher: {
      "@type": "Person",
      name: authorName || SITE_NAME,
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
      item: item.url,
    })),
  };
}
