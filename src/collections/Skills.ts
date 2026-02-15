import type { CollectionConfig } from "payload";
import { revalidateCollection } from "@/lib/revalidate";

export const Skills: CollectionConfig = {
  slug: "skills",
  hooks: {
    afterChange: [() => revalidateCollection("skills")],
    afterDelete: [() => revalidateCollection("skills")],
  },
  admin: {
    useAsTitle: "category",
    defaultColumns: ["category", "order"],
    group: "Portfolio",
  },
  fields: [
    {
      name: "category",
      type: "text",
      required: true,
      label: "Category Name",
      admin: { placeholder: "e.g. Frontend, Backend, Mobile" },
    },
    {
      name: "intro",
      type: "textarea",
      label: "Intro Text",
      admin: { placeholder: "Short description of this skill group." },
    },
    {
      name: "items",
      type: "array",
      label: "Skills",
      minRows: 1,
      fields: [
        {
          name: "skill",
          type: "text",
          required: true,
          label: "Skill",
        },
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
      admin: { description: "Lower number = shown first." },
    },
  ],
};
