/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/mario-web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mario-web' : '',
}

module.exports = nextConfig