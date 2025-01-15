import OpengraphImage from '@/components/opengraph-image';
import { shopifyService } from '@/lib/shopify/services/shopify-service';

export const runtime = 'edge';

export default async function Image({ params }: { params: { collection: string } }) {
  const collection = await shopifyService.getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
