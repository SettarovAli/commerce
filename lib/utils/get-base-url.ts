const { NEXT_PUBLIC_VERCEL_URL, PORT } = process.env;

export const getBaseUrl = () => {
  return NEXT_PUBLIC_VERCEL_URL
    ? `https://${NEXT_PUBLIC_VERCEL_URL}`
    : `http://localhost:${PORT || 3000}`;
};
