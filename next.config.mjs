/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/home/darshan/darshan/WEB_DEVELOPMENT /Grap Deal'
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
