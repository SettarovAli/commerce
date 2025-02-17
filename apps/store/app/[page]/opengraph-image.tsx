import OpengraphImage from '@/components/opengraph-image';
import { shopifyService } from '@/lib/shopify/services/shopify-service';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await shopifyService.getPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
