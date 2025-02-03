'use server';

import { cookies } from 'next/headers';
import { shopifyService } from '@/lib/shopify/services/shopify-service';

export async function createCart() {
  let cart = await shopifyService.createCart();
  (await cookies()).set('cartId', cart.id!);
}
