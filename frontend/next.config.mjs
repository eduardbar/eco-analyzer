/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrites para apuntar API calls al backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://eco-analyzer-backend.onrender.com/api/:path*',
      },
    ]
  },
};

export default nextConfig;
