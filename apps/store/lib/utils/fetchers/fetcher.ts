import { IFetcher } from '@/lib/types/utils/fetcher';
import { TUrl } from '@/lib/types/common';

export class Fetcher implements IFetcher {
  protected baseUrl: TUrl | undefined;

  protected fetchHeaders: HeadersInit;

  protected responseHeaders: Headers | undefined;

  constructor() {
    this.fetchHeaders = this.createHeaders();
  }

  createHeaders(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  setBaseUrl(baseUrl: TUrl): void {
    this.baseUrl = baseUrl;
  }

  async get(url: TUrl): Promise<Response> {
    return this.performFetch(url, this.createFetchOptions('GET'));
  }

  async post(url: TUrl, options: never): Promise<Response> {
    return this.performFetch(url, this.createFetchOptions('POST', options));
  }

  async put(url: TUrl, options: never): Promise<Response> {
    return this.performFetch(url, this.createFetchOptions('PUT', options));
  }

  async patch(url: TUrl, options: never): Promise<Response> {
    return this.performFetch(url, this.createFetchOptions('PATCH', options));
  }

  async delete(url: TUrl): Promise<Response> {
    return this.performFetch(url, this.createFetchOptions('DELETE'));
  }

  getResponseHeaders(): Headers | undefined {
    return this.responseHeaders;
  }

  createFetchOptions(method: RequestInit['method'], options?: RequestInit): RequestInit {
    return {
      ...options,
      method,
      headers: { ...this.fetchHeaders, ...options?.headers }
    };
  }

  async performFetch(url: TUrl, options: RequestInit): Promise<any> {
    const fullUrl = this.buildUrl(url);

    const response = await fetch(fullUrl, options);

    this.responseHeaders = response.headers;

    return response.json();
  }

  buildUrl(url: TUrl): TUrl {
    return url.startsWith('/') ? `${this.baseUrl}${url}` : url;
  }
}
