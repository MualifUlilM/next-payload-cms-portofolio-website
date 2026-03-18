"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMediaUrl } from "@/lib/site";
import type { Testimonial } from "@/types/payload";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="What Clients Say"
          heading="Testimonials"
          align="center"
          className="text-center [&>p]:mx-auto"
        />

        {/* Desktop: 3-col grid | Mobile: horizontal scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible">
          {testimonials.map((t, i) => {
            const avatarSrc = getMediaUrl(t.avatar?.url);

            return (
              <motion.article
                key={t.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="bg-white border border-[#E5E5E5] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]"
              >
                {/* Quote mark */}
                <div className="text-4xl text-[#2563EB] font-serif leading-none mb-4 select-none" aria-hidden="true">
                  &ldquo;
                </div>

                {/* Quote */}
                <blockquote className="text-base text-[#111111] italic leading-relaxed mb-6">
                  {t.quote}
                </blockquote>

                {/* Divider */}
                <div className="border-t border-[#E5E5E5] mb-4" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {avatarSrc ? (
                    <Image
                      src={avatarSrc}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-[#666666]">
                        {t.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">{t.name}</p>
                    <p className="text-xs text-[#666666]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
