import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import type { ICacheService } from './interfaces';

@Injectable()
export class CacheService implements ICacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public get(key: string): Promise<string | undefined> {
    return this.cache.get<string>(key);
  }

  public set(key: string, value: string): Promise<string> {
    return this.cache.set(key, value);
  }
}
