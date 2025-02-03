'use server';

import { cookies } from 'next/headers';
import { shopifyService } from '@/lib/shopify/services/shopify-service';
import { CART_ID_COOKIE } from '@/lib/constants';

export async function createCart() {
  let cart = await shopifyService.createCart();
  (await cookies()).set(CART_ID_COOKIE, cart.id!);
}
