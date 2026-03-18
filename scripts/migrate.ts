import { getPayload } from "payload";

async function runMigrations() {
  process.env.PAYLOAD_MIGRATING = "true";

  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });

  await payload.db.migrate();

  console.log("Migrations complete.");
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
