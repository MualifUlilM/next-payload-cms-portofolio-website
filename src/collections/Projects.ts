import type { CollectionConfig } from "payload";
import { revalidateCollection } from "../lib/revalidate.ts";

export const Projects: CollectionConfig = {
  slug: "projects",
  hooks: {
    afterChange: [() => revalidateCollection("projects")],
    afterDelete: [() => revalidateCollection("projects")],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "order"],
    group: "Portfolio",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier. Use lowercase with hyphens.",
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      admin: {
        description: "One-liner: what it does and for whom (max 15 words)",
      },
    },
    {
      name: "longDescription",
      type: "richText",
      label: "Full Description",
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: "Thumbnail (16:9)",
    },
    {
      name: "images",
      type: "array",
      label: "Additional Screenshots",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "techStack",
      type: "array",
      label: "Tech Stack",
      fields: [
        {
          name: "technology",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Web App", value: "Web App" },
        { label: "Mobile", value: "Mobile" },
        { label: "CMS", value: "CMS" },
        { label: "API", value: "API" },
      ],
    },
    {
      name: "liveUrl",
      type: "text",
      label: "Live URL",
    },
    {
      name: "githubUrl",
      type: "text",
      label: "GitHub URL",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show on homepage featured projects section",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Display order (lower = first)",
      },
    },
    // SEO group
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
          admin: {
            description: "Max 155 characters",
          },
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "OG Image (1200x630)",
        },
      ],
    },
  ],
};
