import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { CACHE_MANAGER } from './di.constant';
import { CacheManagerService } from './cache-manager.service';

const providers: Provider[] = [
  {
    useClass: CacheManagerService,
    provide: CACHE_MANAGER,
  },
];

@Module({
  providers: [...providers],
})
export class CacheManagerModule {}
