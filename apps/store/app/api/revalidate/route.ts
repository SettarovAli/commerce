import { NextRequest, NextResponse } from 'next/server';
import { shopifyService } from '@/lib/shopify/services/shopify-service';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return shopifyService.revalidate(req);
}
