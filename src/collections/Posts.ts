import type { CollectionConfig } from "payload";
import { revalidateCollection } from "../lib/revalidate.ts";

export const Posts: CollectionConfig = {
  slug: "posts",
  hooks: {
    afterChange: [() => revalidateCollection("posts")],
    afterDelete: [() => revalidateCollection("posts")],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "readingTime"],
    group: "Blog",
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
        description: "URL path for this post. Use lowercase with hyphens.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Excerpt / Summary",
      admin: {
        description: "Short summary shown in post listings and meta description",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "Post Content",
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: "Cover Image (16:9)",
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Published Date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "Set to schedule or backdate a post",
      },
    },
    {
      name: "readingTime",
      type: "number",
      label: "Reading Time (minutes)",
      admin: {
        description: "Estimated reading time in minutes",
      },
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
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
          admin: {
            description: "Overrides post title in search results",
          },
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
