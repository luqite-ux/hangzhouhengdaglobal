/** @type {import('next').NextConfig} */
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/[\r\n]/g, '').replace(/\/$/, '')

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (!adminUrl) return []
    return {
      afterFiles: [
        { source: '/admin', destination: `${adminUrl}/admin` },
        { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
        { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
      ],
    }
  },
  async redirects() {
    return [
      { source: '/products/wd-series', destination: '/products/wd-worm-gear-reducer', permanent: true },
      { source: '/products/wp-series', destination: '/products/wp-series-worm-gear-reducer', permanent: true },
      { source: '/products/nmrv-series', destination: '/products/nmrv-series-worm-gear-reducer', permanent: true },
    ]
  },
}

export default nextConfig
