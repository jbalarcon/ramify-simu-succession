/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

// GitHub Pages deployment configuration
if (process.env.GITHUB_ACTIONS === 'true') {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  nextConfig.assetPrefix = `/${repo}/`
  nextConfig.basePath = `/${repo}`
}

module.exports = nextConfig 