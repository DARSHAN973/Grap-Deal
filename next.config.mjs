/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/home/darshan/darshan/WEB_DEVELOPMENT /Grap Deal'
  },
  images: {
    // Allow loading images from Unsplash used as category placeholders
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
