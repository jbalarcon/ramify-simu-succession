/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ramify-simu-succession',
  assetPrefix: '/ramify-simu-succession',
  trailingSlash: true,
}

module.exports = nextConfig 