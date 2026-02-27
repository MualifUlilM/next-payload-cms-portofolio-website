import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { getProjects } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of web applications, CMS implementations, and fullstack builds. Real projects, real outcomes — Next.js, Supabase, and Payload CMS.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-16">
      <Projects projects={projects} />
    </div>
  );
}
