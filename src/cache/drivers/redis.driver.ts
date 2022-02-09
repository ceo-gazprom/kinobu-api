import { Injectable, Inject, Logger } from '@nestjs/common';
import * as IORedis from 'ioredis';
import type { ICacheConfig, ICacheDriver } from '../interfaces';
import { CACHE_CONFIG } from '../cache.constants';

@Injectable()
export class RedisDriver implements ICacheDriver {
  private logger = new Logger(RedisDriver.name);

  private client: IORedis.Redis;
  constructor(
    @Inject(CACHE_CONFIG) private readonly cacheConfig: ICacheConfig,
  ) {
    this.client = new IORedis({
      host: this.cacheConfig.host,
      port: this.cacheConfig.port,
    });
  }

  /**
   * Return the value stored corresponding to the key
   * @param key
   */
  public async get(key: string): Promise<any> {
    const value = await this.client.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  /**
   * Store the value with the passed key
   * @param key
   * @param value
   * @param ttlInSec
   */
  public async set(
    key: string,
    value: Record<string, any> | string,
    ttlInSec?: number,
  ): Promise<void> {
    if (ttlInSec) {
      await this.client.set(key, JSON.stringify(value), 'EX', ttlInSec);
    }

    await this.client.set(key, JSON.stringify(value));
  }

  /**
   * Check for existence of a particular key
   * @param key
   */
  public async has(key: string): Promise<boolean> {
    const num = await this.client.exists(key);
    return !!num;
  }
}
