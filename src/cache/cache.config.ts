import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE } from '../config';
import type { IConfigService } from '../config';
import type { ICacheConfig } from './interfaces';

@Injectable()
export class CacheConfig implements ICacheConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get host(): string {
    return this.configService.getString('REDIS_HOST');
  }

  public get port(): number {
    return this.configService.getNumber('REDIS_PORT');
  }

  /**
   * @description The default expiration time of the cache.
   */
  public get defaultTtl(): number {
    return this.configService.getNumber('REDIS_DEFAULT_TTL');
  }
}
