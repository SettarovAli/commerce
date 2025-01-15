import { ShopifyRepository } from '@/lib/shopify/repositories/shopify-repository';
import { getPageQuery, getPagesQuery } from '@/lib/shopify/queries/page';
import { Page, ShopifyPageOperation, ShopifyPagesOperation } from '@/lib/shopify/types';

export class PageRepository extends ShopifyRepository {
  async getPage(handle: string): Promise<Page> {
    const res = await this.fetch<ShopifyPageOperation>({
      query: getPageQuery,
      cache: 'no-store',
      variables: { handle }
    });

    return res.body.data.pageByHandle;
  }

  async getPages(): Promise<Page[]> {
    const res = await this.fetch<ShopifyPagesOperation>({
      query: getPagesQuery,
      cache: 'no-store'
    });

    return this.removeEdgesAndNodes(res.body.data.pages);
  }
}
