/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/home/darshan/darshan/WEB_DEVELOPMENT /Grap Deal'
  },
  images: {
    // Allow loading images from Unsplash used as category placeholders
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
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
