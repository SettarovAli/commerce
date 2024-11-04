const { ADMIN_DOMAIN, ADMIN_DOMAIN_BASE_PATH } = process.env;

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
        source: ADMIN_DOMAIN_BASE_PATH,
        destination: `${ADMIN_DOMAIN}${ADMIN_DOMAIN_BASE_PATH}`
      },
      {
        source: `${ADMIN_DOMAIN_BASE_PATH}/:path+`,
        destination: `${ADMIN_DOMAIN}${ADMIN_DOMAIN_BASE_PATH}/:path+`
      }
    ];
  }
};
