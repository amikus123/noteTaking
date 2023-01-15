/** @type {import('next').NextConfig} */
const nextRuntimeDotenv = require("next-runtime-dotenv");

const nextConfig = {
  reactStrictMode: true,
};

const withConfig = nextRuntimeDotenv({
  // path: '.env',
  // public: ["API_HOST"],
  // server: ["API_HOST"],
});

module.exports = withConfig({
  ...nextConfig,
});
