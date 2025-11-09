/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['monserratenses.org.ar', 'strapi.monserratenses.org.ar'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
