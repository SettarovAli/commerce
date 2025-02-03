'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { actionClient } from '@/lib/safe-action';
import { shopifyService } from '@/lib/shopify/services/shopify-service';
import { TAGS } from '@/lib/constants';

const schema = z.object({
  merchandiseId: z.string()
});

export const deleteCartItemAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { merchandiseId } }) => {
    const cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) throw new Error('Missing cart ID');

    try {
      const cart = await shopifyService.getCart(cartId);

      if (!cart) throw new Error('Error fetching cart');

      const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

      if (lineItem && lineItem.id) {
        await shopifyService.removeFromCart(cartId, [lineItem.id]);
        revalidateTag(TAGS.cart);
      } else {
        throw new Error('Item not found in cart');
      }
    } catch (error) {
      throw new Error('Error removing item from cart');
    }
  });
