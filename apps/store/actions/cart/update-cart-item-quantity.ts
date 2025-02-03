'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { actionClient } from '@/lib/safe-action';
import { shopifyService } from '@/lib/shopify/services/shopify-service';
import { TAGS } from 'lib/constants';

const schema = z.object({
  merchandiseId: z.string(),
  quantity: z.number()
});

export const updateCartItemQuantityAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { merchandiseId, quantity } }) => {
    const cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) throw new Error('Missing cart ID');

    try {
      const cart = await shopifyService.getCart(cartId);

      if (!cart) throw new Error('Error fetching cart');

      const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

      if (lineItem && lineItem.id) {
        if (quantity === 0) {
          await shopifyService.removeFromCart(cartId, [lineItem.id]);
        } else {
          await shopifyService.updateCart(cartId, [
            {
              id: lineItem.id,
              merchandiseId,
              quantity
            }
          ]);
        }
      } else if (quantity > 0) {
        // If the item doesn't exist in the cart and quantity > 0, add it
        await shopifyService.addToCart(cartId, [{ merchandiseId, quantity }]);
      }

      revalidateTag(TAGS.cart);
    } catch (error) {
      throw new Error('Error updating item quantity');
    }
  });
