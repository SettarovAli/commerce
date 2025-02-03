'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { shopifyService } from '@/lib/shopify/services/shopify-service';
import { CART_ID_COOKIE } from '@/lib/constants';

export async function redirectToCheckout() {
  const cartId = (await cookies()).get(CART_ID_COOKIE)?.value;
  const cart = await shopifyService.getCart(cartId);

  redirect(cart!.checkoutUrl);
}
