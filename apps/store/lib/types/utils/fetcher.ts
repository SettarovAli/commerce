import { TUrl } from '@/lib/types/common';

export interface IFetcher {
  setBaseUrl(baseUrl: TUrl): void;
  createHeaders(): HeadersInit;
  getResponseHeaders(): Headers | undefined;
  get(url: TUrl): Promise<Response>;
  post(url: TUrl, data: any): Promise<Response>;
  put(url: TUrl, data: any): Promise<Response>;
  patch(url: TUrl, data: any): Promise<Response>;
  delete(url: TUrl): Promise<Response>;
  createFetchOptions(method: RequestInit['method'], options: RequestInit): RequestInit;
  performFetch(url: TUrl, options: RequestInit): Promise<Response>;
  buildUrl(url: TUrl): TUrl;
}
