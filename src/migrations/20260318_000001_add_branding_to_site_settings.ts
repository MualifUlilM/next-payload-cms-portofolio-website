import { sql } from "@payloadcms/db-postgres";
import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings"
      ADD COLUMN IF NOT EXISTS "branding_logo_id" integer,
      ADD COLUMN IF NOT EXISTS "branding_favicon_id" integer;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_logo_id_media_id_fk"
        FOREIGN KEY ("branding_logo_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_branding_favicon_id_media_id_fk"
        FOREIGN KEY ("branding_favicon_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings"
      DROP COLUMN IF EXISTS "branding_logo_id",
      DROP COLUMN IF EXISTS "branding_favicon_id";
  `);
}
