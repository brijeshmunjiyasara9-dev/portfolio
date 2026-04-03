/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    // Treat native modules as external so they are not bundled by webpack
    serverComponentsExternalPackages: ['better-sqlite3', 'bcryptjs'],
  },
};

module.exports = nextConfig;
