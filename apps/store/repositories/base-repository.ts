import { Fetcher } from '@/lib/utils/fetchers/fetcher';
import { IFetcher } from '@/lib/types/utils/fetcher';

export abstract class BaseRepository {
  protected static fetcher: IFetcher;

  protected abstract endpoint: string;

  protected fetcher: IFetcher;

  constructor() {
    if (!BaseRepository.fetcher) {
      BaseRepository.fetcher = new Fetcher();
    }

    this.fetcher = BaseRepository.fetcher;
  }
}
