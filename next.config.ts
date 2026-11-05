import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/stand-rentacar" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  assetPrefix: repo || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: repo },
};

export default nextConfig;
