/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {   protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'quest-reallearningstaging.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'theworkflowacademy.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.questt.co',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;