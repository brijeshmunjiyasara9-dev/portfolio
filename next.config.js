/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Allow locally-uploaded images served from /uploads/
    // (Next.js Image component – only needed if you use <Image />;
    //  plain <img> tags work without this config)
    unoptimized: false,
  },
  experimental: {
    // Treat native modules as external so they are not bundled by webpack
    serverComponentsExternalPackages: ['better-sqlite3', 'bcryptjs'],
  },
};

module.exports = nextConfig;
