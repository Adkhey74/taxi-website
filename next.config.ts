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
