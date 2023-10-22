/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dripit.io",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
