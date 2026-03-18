"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { getMediaUrl } from "@/lib/site";
import type { Post } from "@/types/payload";

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const shouldReduceMotion = useReducedMotion();

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Writing"
            heading="Latest Posts"
            className="mb-0"
          />
          <Link
            href="/blog"
            className="text-sm text-[#2563EB] hover:underline font-medium shrink-0 ml-4"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => {
            const thumbnailSrc = getMediaUrl(post.thumbnail?.url);

            return (
              <motion.article
                key={post.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-[#F5F5F5] rounded-lg overflow-hidden mb-4">
                    {thumbnailSrc ? (
                      <Image
                        src={thumbnailSrc}
                        alt={post.thumbnail?.alt || post.title}
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

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag.tag} variant="accent">{tag.tag}</Badge>
                      ))}
                    </div>
                  )}

                  <h3 className="text-base font-semibold text-[#111111] leading-snug group-hover:text-[#2563EB] transition-colors duration-150 mb-2">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-sm text-[#666666] leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-[#666666]">
                    {post.publishedAt && (
                      <span>{formatDate(post.publishedAt)}</span>
                    )}
                    {post.readingTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} min read</span>
                      </>
                    )}
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
