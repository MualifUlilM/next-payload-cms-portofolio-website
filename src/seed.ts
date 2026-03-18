import { getPayload } from "payload";
import { runPortfolioSeed } from "./lib/portfolio-seed.ts";

async function seed() {
  const config = (await import("./payload.config.ts")).default;
  const payload = await getPayload({ config });

  await runPortfolioSeed(payload, (message) => {
    console.log(`✅ ${message}`);
  });
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
