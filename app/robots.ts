const { NEXT_PUBLIC_VERCEL_URL } = process.env;
const baseUrl = NEXT_PUBLIC_VERCEL_URL
  ? `https://${NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
