"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeroProps {
  name?: string;
  availableForWork?: boolean;
  avatarUrl?: string;
  heading?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export function Hero({ name = "Your Name", availableForWork, avatarUrl, heading, subheading, primaryCtaLabel, secondaryCtaLabel }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1 },
        },
      };

  const itemVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" as const },
        },
      };

  return (
    <section
      className="min-h-screen flex items-center pt-16 bg-[#FAFAFA]"
      aria-label="Hero section"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant={availableForWork ? "success" : "outline"}>
                {availableForWork
                  ? "● Available for new projects"
                  : "○ Currently fully booked"}
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-[1.05] tracking-[-0.04em] mb-6"
            >
              {heading ?? "I Build Web Products That Ship and Scale"}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-[#666666] leading-relaxed mb-8 max-w-lg"
            >
              {subheading ?? "Next.js and Payload CMS specialist helping startups and agencies deliver fast, maintainable web products. I write the code and own the outcome."}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                {primaryCtaLabel ?? "Start a Project"}
              </Button>
              <Button variant="secondary" size="lg" href="/projects">
                {secondaryCtaLabel ?? "View My Work"}
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-sm text-[#666666]"
            >
              Trusted by teams in the{" "}
              <span className="text-[#111111] font-medium">US &amp; EU</span>
            </motion.p>
          </motion.div>

          {/* Right: avatar */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Accent glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#2563EB]/5 blur-2xl scale-110 -z-10" />

              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`${name} — Fullstack Developer`}
                  width={480}
                  height={480}
                  priority
                  className="rounded-2xl object-cover w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
                />
              ) : (
                // Placeholder when no avatar is set
                <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-2xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-20 h-20 rounded-full bg-[#E5E5E5] mx-auto mb-4" />
                    <p className="text-sm text-[#666666]">Add your photo in CMS</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
