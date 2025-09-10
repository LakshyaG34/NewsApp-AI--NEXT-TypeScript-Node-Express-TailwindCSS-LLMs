import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: [
      "s.yimg.com", // ✅ allow Yahoo image CDN
      "media.zenfs.com", // ✅ also allow this one from your JSON,
      "biztoc.com"
    ],
  },
  /* config options here */
};

export default nextConfig;
