/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./next-intl.config.js');

const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: ['test.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
