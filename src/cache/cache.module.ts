import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { CACHE_SERVICE } from './cache.constants';
import { CacheService } from './cache.service';
import { cacheConfig } from './cache.config';

const providers: Provider[] = [
  {
    useClass: CacheService,
    provide: CACHE_SERVICE,
  },
];

@Module({
  imports: [NestCacheModule.register(cacheConfig)],
  providers: [...providers],
})
export class CacheModule {}
