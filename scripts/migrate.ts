import payload from "payload";
import config from "../src/payload.config";

process.env.PAYLOAD_MIGRATING = "true";

await payload.init({
  config,
  disableOnInit: true,
});

await payload.db.migrate();

console.log("Migrations complete.");
process.exit(0);
