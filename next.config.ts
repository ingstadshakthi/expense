import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const plugins = [
  bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
];

const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
    ],
  },
  poweredByHeader: false,
};

const withPlugins = (
  plugins: Array<(config: NextConfig) => NextConfig>,
  config: NextConfig
): NextConfig => plugins.reduce((acc, plugin) => plugin(acc), { ...config });

export default withPlugins(plugins, baseConfig);
