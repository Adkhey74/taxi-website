import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dufmpr5dh/**',
      },
    ],
  },
  async redirects() {
    return [
      // Rediriger le domaine technique Railway vers le domaine principal (évite le contenu dupliqué SEO)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'taxi-website-production.up.railway.app' }],
        destination: 'https://www.herntaxi.fr/:path*',
        permanent: true,
      },
      // Redirections de l'ancien site vers le nouveau
      {
        source: '/taxi-aeroport-chambery',
        destination: '/taxi-aeroport',
        permanent: true, // 301 redirect
      },
      {
        source: '/taxi-aeroport-chambery/',
        destination: '/taxi-aeroport',
        permanent: true,
      },
      {
        source: '/reservation-taxi-savoie',
        destination: '/zones-contact',
        permanent: true,
      },
      {
        source: '/reservation-taxi-savoie/',
        destination: '/zones-contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
