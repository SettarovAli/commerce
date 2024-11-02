export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: `${process.env.ADMIN_DOMAIN}/admin`
      },
      {
        source: '/admin/:path+',
        destination: `${process.env.ADMIN_DOMAIN}/admin/:path+`
      }
    ];
  }
};
