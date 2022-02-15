import { Injectable, Inject } from '@nestjs/common';
import { CACHE_DRIVER } from './cache.constants';
import type { ICacheDriver, ICacheService } from './interfaces';

/**
 *
 */
@Injectable()
export class CacheService implements ICacheService {
  /**
   *
   * @param cacheDriver
   */
  constructor(
    @Inject(CACHE_DRIVER) private readonly cacheDriver: ICacheDriver,
  ) {}

  /**
   *
   * @param key
   * @returns
   */
  public get(key: string): Promise<string | undefined> {
    return this.cacheDriver.get(key);
  }

  /**
   *
   * @param key
   * @param value
   * @returns
   */
  public set(key: string, value: string): Promise<void> {
    return this.cacheDriver.set(key, value);
  }

  /**
   *
   * @param key
   */
  // public del(key: string): Promise<string> {}
}
