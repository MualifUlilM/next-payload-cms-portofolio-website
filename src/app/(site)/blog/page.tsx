import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { getPosts } from "@/lib/payload";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on Next.js, Payload CMS, Supabase, and building production web products. Practical posts for developers and technical teams.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="pt-16">
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            eyebrow="Writing"
            heading="Blog"
            subtitle="Practical insights on Next.js, Payload CMS, Supabase, and building production web products."
          />

          {posts.length === 0 ? (
            <p className="text-[#666666]">No posts published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-video bg-[#F5F5F5] rounded-lg overflow-hidden mb-4">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail.url}
                          alt={post.thumbnail.alt || post.title}
                          width={600}
                          height={338}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-[#999999]">No image</span>
                        </div>
                      )}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1.5 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag.id ?? tag.tag} variant="accent">
                            {tag.tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <h2 className="text-base font-semibold text-[#111111] leading-snug group-hover:text-[#2563EB] transition-colors mb-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-[#666666] leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-[#666666]">
                      {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                      {post.readingTime && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
