import { ShopifyRepository } from '@/lib/shopify/repositories/shopify-repository';
import { ProductRepository } from '@/lib/shopify/repositories/product-repository';
import {
  getCollectionQuery,
  getCollectionsQuery,
  getCollectionProductsQuery
} from '@/lib/shopify/queries/collection';
import { TAGS } from '@/lib/constants';
import {
  Collection,
  Product,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyProduct
} from '@/lib/shopify/types';

export class CollectionRepository extends ShopifyRepository {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    super();
    this.productRepository = productRepository;
  }

  async getCollection(handle: string): Promise<Collection | undefined> {
    const res = await this.fetch<ShopifyCollectionOperation>({
      query: getCollectionQuery,
      tags: [TAGS.collections],
      variables: { handle }
    });

    return this.reshapeCollection(res.body.data.collection);
  }

  async getCollections(): Promise<Collection[]> {
    const res = await this.fetch<ShopifyCollectionsOperation>({
      query: getCollectionsQuery,
      tags: [TAGS.collections]
    });

    const shopifyCollections = this.removeEdgesAndNodes(res.body?.data?.collections);
    const collections = [
      {
        handle: '',
        title: 'All',
        description: 'All products',
        seo: {
          title: 'All',
          description: 'All products'
        },
        path: '/search',
        updatedAt: new Date().toISOString()
      },
      // Filter out the `hidden` collections.
      // Collections that start with `hidden-*` need to be hidden on the search page.
      ...this.reshapeCollections(shopifyCollections).filter(
        (collection) => !collection.handle.startsWith('hidden')
      )
    ];

    return collections;
  }

  async getCollectionProducts({
    collection,
    reverse,
    sortKey
  }: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]> {
    const res = await this.fetch<ShopifyCollectionProductsOperation>({
      query: getCollectionProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: {
        handle: collection,
        reverse,
        sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
      }
    });

    if (!res.body.data.collection) {
      console.log(`No collection found for \`${collection}\``);
      return [];
    }

    const products = this.removeEdgesAndNodes(res.body.data.collection.products);
    return this.reshapeProducts(products);
  }

  private reshapeCollection(collection: ShopifyCollection): Collection | undefined {
    if (!collection) {
      return undefined;
    }

    return {
      ...collection,
      path: `/search/${collection.handle}`
    };
  }

  private reshapeCollections(collections: ShopifyCollection[]): Collection[] {
    const reshapedCollections = [];

    for (const collection of collections) {
      if (collection) {
        const reshapedCollection = this.reshapeCollection(collection);

        if (reshapedCollection) {
          reshapedCollections.push(reshapedCollection);
        }
      }
    }

    return reshapedCollections;
  }

  private reshapeProducts(products: ShopifyProduct[]): Product[] {
    return this.productRepository.reshapeProducts(products);
  }
}
