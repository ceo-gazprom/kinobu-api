import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { ConfigModule } from '../config';
import { CACHE_CONFIG, CACHE_DRIVER, CACHE_SERVICE } from './cache.constants';
import { CacheConfig } from './cache.config';
import { CacheService } from './cache.service';
import { RedisDriver } from './drivers';

const internalProviders: Provider[] = [
  {
    provide: CACHE_DRIVER,
    useClass: RedisDriver,
  },
];

const externalProviders: Provider[] = [
  {
    provide: CACHE_SERVICE,
    useClass: CacheService,
  },
  /**
   * Нужен, чтобы использовать интерсептор в декораторе в других модулях
   */
  {
    provide: CACHE_CONFIG,
    useClass: CacheConfig,
  },
];

@Module({
  imports: [ConfigModule],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class CacheModule {}
