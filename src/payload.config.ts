import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { createRequire } from "module";
import path from "path";
import sharp from "sharp";

// Collections
import { Projects } from "./collections/Projects";
import { Experience } from "./collections/Experience";
import { Testimonials } from "./collections/Testimonials";
import { Posts } from "./collections/Posts";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Skills } from "./collections/Skills";

// Globals
import { SiteSettings } from "./globals/SiteSettings";

const runtimeRequire = createRequire(import.meta.url);
const databaseURL =
  process.env.DATABASE_URI?.trim() || `file:${path.resolve(process.cwd(), "data.db")}`;
type PostgresAdapterModule = {
  postgresAdapter: (options: { pool: { connectionString: string } }) => any;
};
type SqliteAdapterModule = {
  sqliteAdapter: (options: { client: { url: string } }) => any;
};

function createDatabaseAdapter(connectionString: string) {
  if (
    connectionString.startsWith("postgres://") ||
    connectionString.startsWith("postgresql://")
  ) {
    try {
      const { postgresAdapter } = runtimeRequire(
        "@payloadcms/db-postgres"
      ) as PostgresAdapterModule;

      return postgresAdapter({
        pool: {
          connectionString,
        },
      });
    } catch (error) {
      const cause =
        error instanceof Error ? ` ${error.message}` : "";

      throw new Error(
        `DATABASE_URI is set to PostgreSQL, but @payloadcms/db-postgres is not available. Run \`npm install @payloadcms/db-postgres\` and restart the server.${cause}`
      );
    }
  }

  const { sqliteAdapter } = runtimeRequire("@payloadcms/db-sqlite") as SqliteAdapterModule;

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
