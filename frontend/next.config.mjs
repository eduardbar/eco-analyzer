/** @type {import('next').NextConfig} */

// Importar Tailwind CSS como CSS directo (no como PostCSS)
import './src/app/globals.css';

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
