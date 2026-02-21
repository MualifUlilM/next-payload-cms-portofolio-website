import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import {
  getProjects,
  getExperience,
  getTestimonials,
  getPosts,
  getSiteSettings,
  getSkills,
} from "@/lib/payload";
import { jsonLdPerson, jsonLdWebsite } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Your Name — Fullstack Developer (Next.js & Payload CMS)",
  description:
    "Fullstack developer specializing in Next.js, Supabase, and Payload CMS. Building fast, maintainable web products for US and EU teams. Available for new projects.",
};

export default async function HomePage() {
  const [projects, skills, experience, testimonials, posts, settings] =
    await Promise.all([
      getProjects({ featured: true }),
      getSkills(),
      getExperience(),
      getTestimonials(true),
      getPosts({ limit: 3 }),
      getSiteSettings(),
    ]);

  return (
    <>
      <JsonLd data={[jsonLdPerson, jsonLdWebsite]} />

      <Hero
        name={settings?.name}
        availableForWork={settings?.availableForWork}
        avatarUrl={settings?.avatar?.url}
        heading={settings?.hero?.heading}
        subheading={settings?.hero?.subheading}
        primaryCtaLabel={settings?.hero?.primaryCtaLabel}
        secondaryCtaLabel={settings?.hero?.secondaryCtaLabel}
      />
      <SocialProof
        enabled={settings?.socialProof?.enabled ?? true}
        label={settings?.socialProof?.label}
        clients={settings?.socialProof?.clients}
      />
      <Projects projects={projects} />
      <Skills groups={skills} />
      <Experience items={experience} />
      <Testimonials testimonials={testimonials} />
      <BlogPreview posts={posts} />
      <Contact
        email={settings?.email}
        availableForWork={settings?.availableForWork}
        contactEnabled={settings?.contact?.enabled ?? true}
        contactButtonLabel={settings?.contact?.buttonLabel}
        contactButtonUrl={settings?.contact?.buttonUrl}
      />
    </>
  );
}
