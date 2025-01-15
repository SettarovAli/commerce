import { BaseRepository } from '@/repositories/base-repository';
import { ensureStartsWith } from '@/lib/utils';
import { isShopifyError } from '@/lib/type-guards';
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '@/lib/constants';
import { Connection, ExtractVariables } from '@/lib/shopify/types';

export class ShopifyRepository implements BaseRepository {
  protected domain: string;
  private endpoint: string;
  private key: string;

  constructor() {
    const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;
    this.domain = SHOPIFY_STORE_DOMAIN ? ensureStartsWith(SHOPIFY_STORE_DOMAIN, 'https://') : '';
    this.endpoint = `${this.domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
    this.key = SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
  }

  async fetch<T>({
    cache = 'force-cache',
    headers,
    query,
    tags,
    variables
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
  }): Promise<{ status: number; body: T } | never> {
    try {
      const result = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.key,
          ...headers
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables })
        }),
        cache,
        ...(tags && { next: { tags } })
      });

      const body = await result.json();

      if (body.errors) {
        throw body.errors[0];
      }

      return {
        status: result.status,
        body
      };
    } catch (e) {
      if (isShopifyError(e)) {
        throw {
          cause: e.cause?.toString() || 'unknown',
          status: e.status || 500,
          message: e.message,
          query
        };
      }

      throw {
        error: e,
        query
      };
    }
  }

  protected removeEdgesAndNodes<T>(connection: Connection<T>): T[] {
    return connection.edges.map((edge) => edge.node);
  }
}
