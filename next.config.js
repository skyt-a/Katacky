const { env } = require("./env");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "image.winudf.com",
      //   port: "",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "tailwindcomponents.com",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
  },
};

module.exports = withPWA(nextConfig);
