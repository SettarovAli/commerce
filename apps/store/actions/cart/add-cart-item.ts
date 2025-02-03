'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { actionClient } from '@/lib/safe-action';
import { shopifyService } from '@/lib/shopify/services/shopify-service';
import { TAGS } from '@/lib/constants';

const schema = z.object({
  selectedVariantId: z.string().optional()
});

export const addCartItemAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { selectedVariantId } }) => {
    const cartId = (await cookies()).get('cartId')?.value;

    const errorMessage = 'Error adding item to the cart';

    if (!cartId || !selectedVariantId) throw new Error(errorMessage);

    try {
      await shopifyService.addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
      revalidateTag(TAGS.cart);
    } catch (e) {
      throw new Error(errorMessage);
    }
  });
