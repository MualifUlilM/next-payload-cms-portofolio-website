import { createRequire } from "module";

const _require = createRequire(import.meta.url);

// @next/env has only named exports but Payload's loadEnv.js imports it as default.
// Patch the CJS module cache before any Payload code loads.
const nextEnvModule = _require("@next/env");
if (!nextEnvModule.default) {
  nextEnvModule.default = nextEnvModule;
}

// Load .env.local before Payload initializes
const { config: loadDotenv } = _require("dotenv");
loadDotenv({ path: ".env.local" });

async function runMigrations() {
  process.env.PAYLOAD_MIGRATING = "true";

  const { getPayload } = await import("payload");
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
