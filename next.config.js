/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper routing
  trailingSlash: false,
  // Vercel optimization
  swcMinify: true,
}

module.exports = nextConfig
