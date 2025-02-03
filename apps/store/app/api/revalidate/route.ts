import { NextRequest, NextResponse } from 'next/server';
import { revalidate } from '@/lib/shopify/revalidate';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
