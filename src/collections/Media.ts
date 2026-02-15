import fs from "fs";
import path from "path";
import type { CollectionConfig } from "payload";

const mediaDir = path.resolve(process.cwd(), "public/media");
fs.mkdirSync(mediaDir, { recursive: true });

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    group: "Content",
  },
  upload: {
    staticDir: mediaDir,
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 432,
        position: "centre",
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt text",
      admin: {
        description: "Required for accessibility and SEO",
      },
    },
  ],
};
