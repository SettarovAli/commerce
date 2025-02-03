import 'server-only';

import { ShopifyRepository } from '@/lib/shopify/repositories/shopify-repository';
import { getCartQuery } from '@/lib/shopify/queries/cart';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from '@/lib/shopify/mutations/cart';
import { TAGS } from '@/lib/constants';
import {
  Cart,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from '@/lib/shopify/types';

export class CartRepository extends ShopifyRepository {
  async createCart(): Promise<Cart> {
    const res = await this.get<ShopifyCreateCartOperation>({
      query: createCartMutation,
      cache: 'no-store'
    });

    return this.reshapeCart(res.data.cartCreate.cart);
  }

  async addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number }[]
  ): Promise<Cart> {
    const res = await this.get<ShopifyAddToCartOperation>({
      query: addToCartMutation,
      variables: { cartId, lines },
      cache: 'no-store'
    });

    return this.reshapeCart(res.data.cartLinesAdd.cart);
  }

  async removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    const res = await this.get<ShopifyRemoveFromCartOperation>({
      query: removeFromCartMutation,
      variables: { cartId, lineIds },
      cache: 'no-store'
    });

    return this.reshapeCart(res.data.cartLinesRemove.cart);
  }

  async updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
  ): Promise<Cart> {
    const res = await this.get<ShopifyUpdateCartOperation>({
      query: editCartItemsMutation,
      variables: { cartId, lines },
      cache: 'no-store'
    });

    return this.reshapeCart(res.data.cartLinesUpdate.cart);
  }

  async getCart(cartId: string | undefined): Promise<Cart | undefined> {
    if (!cartId) {
      return undefined;
    }

    const res = await this.get<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId },
      tags: [TAGS.cart]
    });

    // Old carts becomes `null` when you checkout.
    if (!res.data.cart) {
      return undefined;
    }

    return this.reshapeCart(res.data.cart);
  }

  private reshapeCart(cart: ShopifyCart): Cart {
    if (!cart.cost?.totalTaxAmount) {
      cart.cost.totalTaxAmount = {
        amount: '0.0',
        currencyCode: cart.cost.totalAmount.currencyCode
      };
    }

    return {
      ...cart,
      lines: this.removeEdgesAndNodes(cart.lines)
    };
  }
}
