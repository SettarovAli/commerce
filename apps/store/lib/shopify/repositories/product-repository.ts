import 'server-only';

import { ShopifyRepository } from '@/lib/shopify/repositories/shopify-repository';
import {
  getProductQuery,
  getProductsQuery,
  getProductRecommendationsQuery
} from '@/lib/shopify/queries/product';
import { TAGS, HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import {
  Product,
  ShopifyProduct,
  Image,
  Connection,
  ShopifyProductOperation,
  ShopifyProductsOperation,
  ShopifyProductRecommendationsOperation
} from '@/lib/shopify/types';

export class ProductRepository extends ShopifyRepository {
  async getProduct(handle: string): Promise<Product | undefined> {
    const res = await this.fetch<ShopifyProductOperation>({
      query: getProductQuery,
      tags: [TAGS.products],
      variables: { handle }
    });

    return this.reshapeProduct(res.data.product, false);
  }

  async getProducts(options: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  }): Promise<Product[]> {
    const res = await this.fetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      tags: [TAGS.products],
      variables: options
    });

    const products = this.removeEdgesAndNodes(res.data.products);
    return this.reshapeProducts(products);
  }

  async getProductRecommendations(productId: string): Promise<Product[]> {
    const res = await this.fetch<ShopifyProductRecommendationsOperation>({
      query: getProductRecommendationsQuery,
      tags: [TAGS.products],
      variables: { productId }
    });

    return this.reshapeProducts(res.data.productRecommendations);
  }

  reshapeProducts(products: ShopifyProduct[]): Product[] {
    const reshapedProducts = [];

    for (const product of products) {
      if (product) {
        const reshapedProduct = this.reshapeProduct(product);

        if (reshapedProduct) {
          reshapedProducts.push(reshapedProduct);
        }
      }
    }

    return reshapedProducts;
  }

  private reshapeProduct(
    product: ShopifyProduct,
    filterHiddenProducts: boolean = true
  ): Product | undefined {
    if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
      return undefined;
    }

    const { images, variants, ...rest } = product;

    return {
      ...rest,
      images: this.reshapeImages(images, product.title),
      variants: this.removeEdgesAndNodes(variants)
    };
  }

  private reshapeImages(images: Connection<Image>, productTitle: string): Image[] {
    const flattened = this.removeEdgesAndNodes(images);

    return flattened.map((image) => {
      const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
      return {
        ...image,
        altText: image.altText || `${productTitle} - ${filename}`
      };
    });
  }
}
