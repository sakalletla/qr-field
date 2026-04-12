import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Minimal Node server image for Docker / Kubernetes / private cloud. */
  output: "standalone",
};

export default nextConfig;
