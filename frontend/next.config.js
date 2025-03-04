/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ["import", "legacy-js-api"],
    quietDeps: true,
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
