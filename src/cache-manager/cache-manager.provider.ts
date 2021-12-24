import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ICacheManagerProvider } from './interfaces';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheManagerProvider implements ICacheManagerProvider {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public get(key: string): Promise<string | undefined> {
    return this.cache.get<string>(key);
  }

  public set(key: string, value: string): Promise<string> {
    return this.cache.set(key, value);
  }
}
