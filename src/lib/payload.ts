/**
 * Payload CMS data fetching via local API (no HTTP).
 * Runs server-side only — never ships to the browser.
 * Uses unstable_cache for ISR-style caching with tag-based revalidation.
 */

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import type { Where } from "payload";
import config from "@/payload.config";
import type {
  Project,
  Experience,
  Testimonial,
  Post,
  SiteSettings,
  SkillGroup,
} from "@/types/payload";

async function getPayloadClient() {
  return getPayload({ config });
}

// ============================================
// Projects
// ============================================

export const getProjects = unstable_cache(
  async (options?: {
    featured?: boolean;
    category?: string;
    limit?: number;
  }): Promise<Project[]> => {
    try {
      const payload = await getPayloadClient();
      const where: Where = {};
      if (options?.featured !== undefined) where.featured = { equals: options.featured };
      if (options?.category) where.category = { equals: options.category };

      const res = await payload.find({
        collection: "projects",
        sort: "order",
        limit: options?.limit ?? 100,
        depth: 1,
        where,
      });
      return res.docs as unknown as Project[];
    } catch (err) {
      console.error("getProjects error:", err);
      return [];
    }
  },
  ["projects"],
  { revalidate: 3600, tags: ["projects"] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<Project | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "projects",
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      });
      return (res.docs[0] as unknown as Project) ?? null;
    } catch (err) {
      console.error("getProjectBySlug error:", err);
      return null;
    }
  },
  ["project-by-slug"],
  { revalidate: 3600, tags: ["projects"] }
);

// ============================================
// Experience
// ============================================

export const getExperience = unstable_cache(
  async (): Promise<Experience[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "experience",
        sort: "-startDate",
        depth: 1,
        limit: 50,
      });
      return res.docs as unknown as Experience[];
    } catch (err) {
      console.error("getExperience error:", err);
      return [];
    }
  },
  ["experience"],
  { revalidate: 86400, tags: ["experience"] }
);

// ============================================
// Testimonials
// ============================================

export const getTestimonials = unstable_cache(
  async (featured?: boolean): Promise<Testimonial[]> => {
    try {
      const payload = await getPayloadClient();
      const where: Where = {};
      if (featured !== undefined) where.featured = { equals: featured };

      const res = await payload.find({
        collection: "testimonials",
        depth: 1,
        limit: 50,
        where,
      });
      return res.docs as unknown as Testimonial[];
    } catch (err) {
      console.error("getTestimonials error:", err);
      return [];
    }
  },
  ["testimonials"],
  { revalidate: 86400, tags: ["testimonials"] }
);

// ============================================
// Posts
// ============================================

export const getPosts = unstable_cache(
  async (options?: { limit?: number }): Promise<Post[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "posts",
        sort: "-publishedAt",
        limit: options?.limit ?? 50,
        depth: 1,
      });
      return res.docs as unknown as Post[];
    } catch (err) {
      console.error("getPosts error:", err);
      return [];
    }
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      });
      return (res.docs[0] as unknown as Post) ?? null;
    } catch (err) {
      console.error("getPostBySlug error:", err);
      return null;
    }
  },
  ["post-by-slug"],
  { revalidate: 3600, tags: ["posts"] }
);

// ============================================
// Skills
// ============================================

export const getSkills = unstable_cache(
  async (): Promise<SkillGroup[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "skills",
        sort: "order",
        limit: 20,
        depth: 1,
      });
      return res.docs as unknown as SkillGroup[];
    } catch (err) {
      console.error("getSkills error:", err);
      return [];
    }
  },
  ["skills"],
  { revalidate: 86400, tags: ["skills"] }
);

// ============================================
// Site Settings (Global)
// ============================================

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.findGlobal({
        slug: "site-settings",
        depth: 1,
      });
      return res as unknown as SiteSettings;
    } catch (err) {
      console.error("getSiteSettings error:", err);
      return null;
    }
  },
  ["site-settings"],
  { revalidate: 86400, tags: ["site-settings"] }
);
