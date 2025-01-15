import { ExtractVariables } from '@/lib/shopify/types';

export interface BaseRepository {
  fetch<T>({
    cache,
    headers,
    query,
    tags,
    variables
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
  }): Promise<{ status: number; body: T }>;
}
