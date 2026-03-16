import type { GlobalConfig } from "payload";
import { revalidateCollection } from "../lib/revalidate.ts";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  hooks: {
    afterChange: [() => revalidateCollection("site-settings")],
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Your Name",
      defaultValue: "Your Name",
    },
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Heading",
          defaultValue: "I Build Web Products That Ship and Scale",
        },
        {
          name: "subheading",
          type: "textarea",
          label: "Subheading",
          defaultValue: "Next.js and Payload CMS specialist helping startups and agencies deliver fast, maintainable web products. I write the code and own the outcome.",
        },
        {
          name: "primaryCtaLabel",
          type: "text",
          label: "Primary CTA Label",
          defaultValue: "Start a Project",
        },
        {
          name: "secondaryCtaLabel",
          type: "text",
          label: "Secondary CTA Label",
          defaultValue: "View My Work",
        },
      ],
    },
    {
      name: "socialProof",
      type: "group",
      label: "Social Proof Bar",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Show social proof bar",
          defaultValue: true,
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          defaultValue: "Trusted by teams at",
        },
        {
          name: "clients",
          type: "array",
          label: "Client Names",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              label: "Name",
            },
          ],
          defaultValue: [
            { name: "Acme Corp" },
            { name: "NorthBay Studio" },
            { name: "TaskFlow" },
            { name: "BuildCo" },
            { name: "Venture Labs" },
            { name: "Prodify" },
          ],
        },
      ],
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline",
      admin: {
        description: "Short tagline (max 12 words). Shown in footer and social sharing.",
      },
      defaultValue: "Full-stack development for teams who need it done right.",
    },
    {
      name: "bio",
      type: "textarea",
      label: "Short Bio",
      admin: {
        description: "50–70 word bio for sidebar or intro card",
      },
      defaultValue:
        "I'm a fullstack developer specializing in React, Next.js, and Payload CMS. I've helped startups and product agencies build web applications that are fast, maintainable, and ready to scale. My clients value clear communication and shipping on schedule — not just writing code, but taking ownership of outcomes. Based remotely, I work with teams across the US and EU.",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Profile Photo",
    },
    {
      name: "email",
      type: "email",
      label: "Contact Email",
    },
    {
      name: "availableForWork",
      type: "checkbox",
      label: "Available for new projects",
      defaultValue: true,
      admin: {
        description: "Controls the availability badge on homepage and contact page",
      },
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Section",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Show contact form",
          defaultValue: true,
          admin: {
            description: "When disabled, a button linking to an external URL is shown instead.",
          },
        },
        {
          name: "buttonLabel",
          type: "text",
          label: "Button Label",
          defaultValue: "Book a Call",
          admin: {
            description: "Label for the button shown when form is disabled.",
            condition: (_, siblingData) => !siblingData?.enabled,
          },
        },
        {
          name: "buttonUrl",
          type: "text",
          label: "Button URL",
          admin: {
            description: "Link destination when form is disabled (e.g. Calendly, Notion, etc.)",
            condition: (_, siblingData) => !siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: "socialLinks",
      type: "group",
      label: "Social Links",
      fields: [
        {
          name: "github",
          type: "text",
          label: "GitHub URL",
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
        },
        {
          name: "twitter",
          type: "text",
          label: "Twitter / X URL",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "Default SEO",
      fields: [
        {
          name: "defaultMetaTitle",
          type: "text",
          label: "Default Meta Title",
          defaultValue: "Your Name — Fullstack Developer (Next.js & Payload CMS)",
        },
        {
          name: "defaultMetaDescription",
          type: "textarea",
          label: "Default Meta Description",
          defaultValue:
            "Fullstack developer specializing in Next.js, Supabase, and Payload CMS. Building fast, maintainable web products for US and EU teams.",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Default OG Image (1200x630)",
        },
      ],
    },
  ],
};
