import { getBaseUrl } from 'lib/utils/get-base-url';

const baseUrl = getBaseUrl();

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
