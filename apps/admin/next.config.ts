const { NEXT_PUBLIC_BASE_PATH, STORE_HOST } = process.env;

export default {
  basePath: NEXT_PUBLIC_BASE_PATH,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: [STORE_HOST]
    }
  }
};
