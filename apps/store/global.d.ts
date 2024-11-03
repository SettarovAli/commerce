namespace NodeJS {
  interface ProcessEnv {
    TWITTER_CREATOR: string;
    TWITTER_SITE: string;
    SITE_NAME: string;
    SHOPIFY_REVALIDATION_SECRET: string;
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: string;
    SHOPIFY_STORE_DOMAIN: string;

    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;

    ADMIN_DOMAIN: string;
  }
}
