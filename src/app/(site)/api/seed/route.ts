import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { runPortfolioSeed } from "@/lib/portfolio-seed";

// Protect with a secret - hit this URL to seed:
// GET /api/seed?secret=seed123
const SEED_SECRET = process.env.SEED_SECRET || "seed123";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("secret") !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const log: string[] = [];

  await runPortfolioSeed(payload, (message) => {
    log.push(message);
  });

  return NextResponse.json({
    success: true,
    message: "Seed complete",
    log,
  });
}
