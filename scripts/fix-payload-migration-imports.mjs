import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const migrationsDir = path.resolve(process.cwd(), "src/migrations");

const replacements = new Map([
  [
    "import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'",
    "import { sql } from '@payloadcms/db-postgres'\nimport type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'",
  ],
  [
    'import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres"',
    'import { sql } from "@payloadcms/db-postgres"\nimport type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres"',
  ],
  [
    "import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'",
    "import { sql } from '@payloadcms/db-sqlite'\nimport type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'",
  ],
  [
    'import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-sqlite"',
    'import { sql } from "@payloadcms/db-sqlite"\nimport type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-sqlite"',
  ],
]);

if (!existsSync(migrationsDir)) {
  process.exit(0);
}

for (const fileName of readdirSync(migrationsDir)) {
  if (!fileName.endsWith(".ts")) {
    continue;
  }

  const filePath = path.join(migrationsDir, fileName);
  const original = readFileSync(filePath, "utf8");
  let next = original;

  for (const [search, replace] of replacements) {
    next = next.replace(search, replace);
  }

  if (next !== original) {
    writeFileSync(filePath, next);
    console.log(`fixed migration imports: ${path.relative(process.cwd(), filePath)}`);
  }
}
