import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify';
import packageJson from '../package.json';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

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
      <body data-version={packageJson.version} className="flex min-h-screen w-full flex-col">
        {children}
        <ToastContainer position="bottom-right" />
      </body>
      <Analytics />
    </html>
  );
}
