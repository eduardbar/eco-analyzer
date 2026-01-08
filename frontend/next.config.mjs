/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://eco-analyzer-production.up.railway.app/api/:path*',
      },
    ]
  },
};

export default nextConfig;
