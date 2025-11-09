/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false, // Usar optimización de imágenes de Next.js
    // Configuración optimizada para JPG/PNG/WebP desde VPS
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '168.231.99.125',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp'], // Next.js convertirá automáticamente a WebP para navegadores compatibles
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Tamaños responsive
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tamaños para íconos
  },
}

module.exports = nextConfig
