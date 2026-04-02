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
  experimental: {
    // Treat native modules as external so they are not bundled by webpack
    serverComponentsExternalPackages: ['better-sqlite3', 'bcryptjs'],
  },
  // Increase body size limit for file uploads (10 MB)
  serverRuntimeConfig: {
    maxRequestBodySize: '10mb',
  },
};

module.exports = nextConfig;
