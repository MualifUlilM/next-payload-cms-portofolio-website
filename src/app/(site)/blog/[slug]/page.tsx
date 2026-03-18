import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { getPostBySlug, getPosts, getSiteSettings } from "@/lib/payload";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { BASE_URL, getAbsoluteMediaUrl, getMediaUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const image =
    getAbsoluteMediaUrl(post.seo?.ogImage?.url || post.thumbnail?.url) ||
    `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title: post.seo?.metaTitle ? { absolute: post.seo.metaTitle } : post.title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();
  const thumbnailSrc = getMediaUrl(post.thumbnail?.url);

  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    image: post.thumbnail?.url,
    authorName: settings?.name,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />

      <div className="pt-16">
        <article className="max-w-3xl mx-auto px-6 py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#666666]">
              <li><Link href="/" className="hover:text-[#2563EB]">Home</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href="/blog" className="hover:text-[#2563EB]">Blog</Link></li>
              <li aria-hidden="true">·</li>
              <li className="text-[#111111] font-medium truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag.id ?? tag.tag} variant="accent">
                  {tag.tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#666666] mb-8">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            {post.readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>

          {/* Thumbnail */}
          {thumbnailSrc && (
            <div className="aspect-video rounded-lg overflow-hidden mb-10">
              <Image
                src={thumbnailSrc}
                alt={post.thumbnail?.alt || post.title}
                width={768}
                height={432}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          )}

          {/* Content — richText rendered as prose */}
          {/*
            When Payload CMS is connected, replace this with a proper Lexical renderer.
            For now, we display a placeholder.
          */}
          <div className="prose prose-neutral max-w-none">
            {post.excerpt && (
              <p className="text-lg text-[#666666] leading-relaxed">
                {post.excerpt}
              </p>
            )}
            {!post.content && (
              <p className="text-[#666666] mt-8">
                Full post content will render here once Payload CMS richText renderer is connected.
              </p>
            )}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-[#E5E5E5]">
            <Link
              href="/blog"
              className="text-sm text-[#2563EB] hover:underline font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
