import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_DRIVER } from './cache.constants';
import type { ICacheDriver, ICacheService } from './interfaces';

/**
 *
 */
@Injectable()
export class CacheService implements ICacheService {
  private logger = new Logger(CacheService.name);
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
  public set(key: string, value: string, ttl?: number): Promise<void> {
    return this.cacheDriver.set(key, value, ttl);
  }

  /**
   *
   * @param key
   */
  // public del(key: string): Promise<string> {}
}
