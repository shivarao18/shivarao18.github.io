import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
