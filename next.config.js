/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Treat native modules as external so they're not bundled
  serverExternalPackages: ['better-sqlite3', 'bcryptjs'],
};

module.exports = nextConfig;
