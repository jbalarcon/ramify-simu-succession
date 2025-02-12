/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/ramify-simu-succession' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/ramify-simu-succession/' : '',
}

module.exports = nextConfig 