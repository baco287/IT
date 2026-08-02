import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/IT",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { cpus: 2, workerThreads: false },
};

export default nextConfig;
