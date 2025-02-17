import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { ToastContainer } from 'react-toastify';

import { CartProvider } from '@/components/cart/cart-context';
import { Navbar } from '@/components/layout/navbar';
import AuthProvider from '@/lib/firebase/auth/context';
import { getBaseUrl } from '@/lib/utils/get-base-url';
import { ensureStartsWith } from '@/lib/utils';
import { shopifyService } from '@/lib/shopify/services/shopify-service';
import { CART_ID_COOKIE } from '@/lib/constants';

import packageJson from '../package.json';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = getBaseUrl();
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = (await cookies()).get(CART_ID_COOKIE)?.value;
  // Don't await the fetch, pass the Promise to the context provider
  const cart = shopifyService.getCart(cartId);

  return (
    <html lang="en" dir="ltr" className={GeistSans.variable}>
      <body
        data-version={packageJson.version}
        className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"
      >
        <AuthProvider>
          <CartProvider cartPromise={cart}>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
