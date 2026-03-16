import type { CollectionConfig } from "payload";
import { revalidateCollection } from "../lib/revalidate.ts";

export const Experience: CollectionConfig = {
  slug: "experience",
  hooks: {
    afterChange: [() => revalidateCollection("experience")],
    afterDelete: [() => revalidateCollection("experience")],
  },
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "company", "startDate", "endDate"],
    group: "Portfolio",
  },
  fields: [
    {
      name: "company",
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
      name: "startDate",
      type: "date",
      required: true,
      label: "Start Date",
      admin: {
        date: {
          pickerAppearance: "monthOnly",
          displayFormat: "MMM yyyy",
        },
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date",
      admin: {
        description: "Leave empty if this is your current role",
        date: {
          pickerAppearance: "monthOnly",
          displayFormat: "MMM yyyy",
        },
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Description",
    },
    {
      name: "technologies",
      type: "array",
      label: "Technologies Used",
      fields: [
        {
          name: "technology",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
      label: "Company Logo",
    },
  ],
};
