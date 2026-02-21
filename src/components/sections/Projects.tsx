"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Project, ProjectCategory } from "@/types/payload";

type FilterCategory = "All" | ProjectCategory;
const FILTERS: FilterCategory[] = ["All", "Web App", "Mobile", "CMS", "API"];

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Work"
          heading="Selected Projects"
          subtitle="Real-world applications built with Next.js, Supabase, and Payload CMS."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <Button
              key={f}
              variant="ghost"
              size="sm"
              className={activeFilter === f ? "text-[#111111] border-[#E5E5E5]" : ""}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-[#666666] py-12 text-center">No projects in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} shouldReduceMotion={!!shouldReduceMotion} />
            ))}
          </div>
        )}

        {projects.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="secondary" href="/projects">
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  shouldReduceMotion,
}: {
  project: Project;
  index: number;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.10),0_12px_32px_rgba(0,0,0,0.08)] hover:scale-[1.01] transition-all duration-200 ease-out"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-[#F5F5F5] relative overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt || project.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#999999] text-sm">No preview</span>
          </div>
        )}
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-1">
          <Badge variant="outline">{project.category}</Badge>
        </div>
        <h3 className="text-base font-semibold text-[#111111] mt-2 mb-1 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-[#666666] leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech.technology} variant="default">{tech.technology}</Badge>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline font-medium"
            >
              Live site →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666] hover:text-[#111111] hover:underline"
            >
              GitHub
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <Link
              href={`/projects`}
              className="text-[#2563EB] hover:underline font-medium"
            >
              View details →
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
