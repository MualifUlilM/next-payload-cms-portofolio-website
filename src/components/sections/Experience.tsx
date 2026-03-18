"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDateRange } from "@/lib/utils";
import { getMediaUrl } from "@/lib/site";
import type { Experience as ExperienceType } from "@/types/payload";

interface ExperienceProps {
  items: ExperienceType[];
}

export function Experience({ items }: ExperienceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Background"
          heading="Work Experience"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-[#E5E5E5] hidden sm:block" aria-hidden="true" />

          <ul className="flex flex-col gap-10" role="list">
            {items.map((item, i) => {
              const logoSrc = getMediaUrl(item.companyLogo?.url);

              return (
                <motion.li
                  key={item.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  className="relative sm:pl-12"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-2 top-1 w-3 h-3 rounded-full border-2 border-[#2563EB] hidden sm:block ${
                      !item.endDate ? "bg-[#2563EB]" : "bg-white"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    {logoSrc && (
                      <div className="shrink-0 mt-0.5">
                        <Image
                          src={logoSrc}
                          alt={`${item.company} logo`}
                          width={40}
                          height={40}
                          className="rounded object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[#111111] leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-sm text-[#2563EB] font-medium mt-0.5">
                        {item.company}
                      </p>
                      <p className="text-xs text-[#666666] mt-1 mb-3">
                        {formatDateRange(item.startDate, item.endDate)}
                      </p>

                      {/* Technologies */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.technologies.map((tech) => (
                            <Badge key={tech.technology} variant="default">{tech.technology}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
