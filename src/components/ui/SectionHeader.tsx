"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, ease: "easeOut" as const },
      };

  return (
    <motion.div
      {...fadeUp}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-[#2563EB] mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold text-[#111111] leading-tight tracking-tight mb-3">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#666666] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
