/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: 'next/font/google',
        options: { subsets: ['latin'], display: 'swap' }
      }
    ]
  }
}

module.exports = nextConfig
