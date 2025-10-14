import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPWA from "next-pwa";

const plugins = [
  bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
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
