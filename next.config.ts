import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ["s3-alpha-sig.figma.com"],
  },
};

export default withNextIntl(nextConfig);
  