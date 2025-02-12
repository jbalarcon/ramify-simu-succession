/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ramify-simu-succession' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ramify-simu-succession' : '',
  trailingSlash: true,
}

module.exports = nextConfig 