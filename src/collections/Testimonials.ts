import type { CollectionConfig } from "payload";
import { revalidateCollection } from "../lib/revalidate.ts";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  hooks: {
    afterChange: [() => revalidateCollection("testimonials")],
    afterDelete: [() => revalidateCollection("testimonials")],
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "rating", "featured"],
    group: "Portfolio",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      label: "Job Title",
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Profile Photo",
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
      admin: {
        description: "The testimonial quote. No need to add quotation marks.",
      },
    },
    {
      name: "rating",
      type: "select",
      label: "Rating",
      options: [
        { label: "5 stars", value: "5" },
        { label: "4 stars", value: "4" },
        { label: "3 stars", value: "3" },
      ],
      defaultValue: "5",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Show on homepage testimonials section",
      },
    },
  ],
};
