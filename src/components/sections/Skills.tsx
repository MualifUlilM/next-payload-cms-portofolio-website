"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import type { SkillGroup } from "@/types/payload";

interface SkillsProps {
  groups?: SkillGroup[];
}

const FALLBACK_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    category: "Frontend",
    createdAt: "",
    intro:
      "Building fast, accessible interfaces with React and Next.js — from static marketing pages to complex data-driven applications.",
    items: [
      { skill: "React" }, { skill: "Next.js" }, { skill: "TypeScript" },
      { skill: "Tailwind CSS" }, { skill: "Framer Motion" }, { skill: "HTML / CSS" },
    ],
    updatedAt: "",
  },
  {
    id: "backend",
    category: "Backend",
    createdAt: "",
    intro:
      "Designing databases and APIs that support real product needs: row-level security, efficient queries, and CMS structures.",
    items: [
      { skill: "Payload CMS" }, { skill: "Supabase" }, { skill: "PostgreSQL" },
      { skill: "Node.js" }, { skill: "REST APIs" }, { skill: "tRPC" },
    ],
    updatedAt: "",
  },
];

export function Skills({ groups }: SkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const skillGroups = groups && groups.length > 0 ? groups : FALLBACK_GROUPS;

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Expertise"
          heading="What I Work With"
          subtitle="A deliberate stack — chosen for reliability, performance, and long-term maintainability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id ?? group.category}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIndex * 0.1, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#666666] mb-2">
                {group.category}
              </p>
              {group.intro && (
                <p className="text-sm text-[#666666] leading-relaxed mb-4">
                  {group.intro}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {group.items?.map((item, skillIndex) => (
                  <motion.div
                    key={item.id ?? item.skill}
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: groupIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <Badge variant="default">{item.skill}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
