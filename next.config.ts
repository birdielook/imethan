import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Optional: Add a trailing slash to make it work with Firebase Hosting
  trailingSlash: true,
};

export default nextConfig;
