import 'server-only';

import { ShopifyRepository } from '@/lib/shopify/repositories/shopify-repository';
import { getMenuQuery } from '@/lib/shopify/queries/menu';
import { TAGS } from '@/lib/constants';
import { Menu, ShopifyMenuOperation } from '@/lib/shopify/types';

export class MenuRepository extends ShopifyRepository {
  async getMenu(handle: string): Promise<Menu[]> {
    const res = await this.get<ShopifyMenuOperation>({
      query: getMenuQuery,
      tags: [TAGS.collections],
      variables: { handle }
    });

    return (
      res.data?.menu?.items.map((item: { title: string; url: string }) => ({
        title: item.title,
        path: item.url
          .replace(this.domain, '')
          .replace('/collections', '/search')
          .replace('/pages', '')
      })) || []
    );
  }
}
