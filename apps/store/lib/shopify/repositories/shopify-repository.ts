import 'server-only';

import { BaseRepository } from '@/repositories/base-repository';
import { ShopifyFetcher } from '@/lib/utils/fetchers/shopify-fetcher';
import { ensureStartsWith } from '@/lib/utils';
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '@/lib/constants';
import { Connection, ExtractVariables } from '@/lib/shopify/types';

const { SHOPIFY_STORE_DOMAIN } = process.env;

export abstract class ShopifyRepository extends BaseRepository {
  protected domain = SHOPIFY_STORE_DOMAIN ? ensureStartsWith(SHOPIFY_STORE_DOMAIN, 'https://') : '';

  protected endpoint: string = `${this.domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

  constructor() {
    super();

    if (!ShopifyFetcher.fetcher) {
      ShopifyFetcher.fetcher = new ShopifyFetcher();
    }

    this.fetcher = ShopifyFetcher.fetcher;
  }

  async get<T>({
    query,
    variables,
    headers,
    tags,
    cache = 'force-cache'
  }: {
    query: string;
    variables?: ExtractVariables<T>;
    headers?: HeadersInit;
    tags?: string[];
    cache?: RequestCache;
  }): Promise<T> {
    const response = await this.fetcher.post(this.endpoint, {
      headers,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    return response as T;
  }

  protected removeEdgesAndNodes<T>(connection: Connection<T>): T[] {
    return connection.edges.map((edge) => edge.node);
  }
}
