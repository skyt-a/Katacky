const { env } = require("./env");

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

module.exports = nextConfig;
