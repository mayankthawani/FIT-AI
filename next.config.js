/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add your image domains here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
