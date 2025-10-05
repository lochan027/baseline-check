/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify deployment with server functions
  trailingSlash: false,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig