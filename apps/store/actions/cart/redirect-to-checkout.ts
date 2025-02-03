'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { shopifyService } from '@/lib/shopify/services/shopify-service';

export async function redirectToCheckout() {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = await shopifyService.getCart(cartId);

  redirect(cart!.checkoutUrl);
}
