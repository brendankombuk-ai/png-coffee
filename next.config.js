/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Local Strapi dev server
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Production Strapi CMS — update the hostname to match your deployed
      // CMS domain (or S3/CDN domain if using object storage for uploads).
      {
        protocol: "https",
        hostname: "cms.pngcoffee.com",
        pathname: "/uploads/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
