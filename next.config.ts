import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withPayload } = require("@payloadcms/next/withPayload");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      { pathname: "/api/media/file/**" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withPayload(nextConfig);
