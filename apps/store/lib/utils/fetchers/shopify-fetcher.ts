import { Fetcher } from '@/lib/utils/fetchers/fetcher';
import { IFetcher } from '@/lib/types/utils/fetcher';

const { SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;

export class ShopifyFetcher extends Fetcher {
  static fetcher: IFetcher;

  createHeaders(): HeadersInit {
    return {
      'content-type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
    };
  }
}
