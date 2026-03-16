import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import sharp from "sharp";

// Collections
import { Projects } from "./collections/Projects.ts";
import { Experience } from "./collections/Experience.ts";
import { Testimonials } from "./collections/Testimonials.ts";
import { Posts } from "./collections/Posts.ts";
import { Media } from "./collections/Media.ts";
import { Users } from "./collections/Users.ts";
import { Skills } from "./collections/Skills.ts";

// Globals
import { SiteSettings } from "./globals/SiteSettings.ts";

const databaseURL =
  process.env.DATABASE_URI?.trim() || `file:${path.resolve(process.cwd(), "data.db")}`;

function createDatabaseAdapter(connectionString: string) {
  if (
    connectionString.startsWith("postgres://") ||
    connectionString.startsWith("postgresql://")
  ) {
    return postgresAdapter({
      pool: {
        connectionString,
      },
    });
  }

  return sqliteAdapter({
    client: {
      url: connectionString,
    },
  });
}

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "— Portfolio CMS",
    },
  },
  collections: [Users, Projects, Skills, Experience, Testimonials, Posts, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  typescript: {
    outputFile: path.resolve(process.cwd(), "src/payload-types.ts"),
  },
  db: createDatabaseAdapter(databaseURL),
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  },
});
