import type { NextConfig } from "next";

// Produktion (qontex.de) läuft im Root; das GitHub-Pages-Staging setzt
// NEXT_PUBLIC_BASE_PATH=/IT im Workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { cpus: 2, workerThreads: false },
};

export default nextConfig;
