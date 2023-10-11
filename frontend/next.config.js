/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geniusolutions.gr",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
