import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import * as cacheManager from 'cache-manager';
import { ConfigModule } from '../config';
import { CACHE_CONFIG, CACHE_SERVICE } from './cache.constants';
import { CacheConfig } from './cache.config';
import { CacheService } from './cache.service';

const internalProviders: Provider[] = [
  {
    provide: CACHE_CONFIG,
    useClass: CacheConfig,
  },
];

const externalProviders: Provider[] = [
  {
    provide: CACHE_SERVICE,
    useClass: CacheService,
  },
];

@Module({
  imports: [ConfigModule],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class CacheModule {}
