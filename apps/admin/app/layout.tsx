import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  title: `Admin | ${SITE_NAME}`,
  robots: {
    follow: false,
    index: false
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
