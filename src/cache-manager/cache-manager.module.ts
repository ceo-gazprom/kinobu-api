import { CacheModule, Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { CACHE_MANAGER_PROVIDER } from './di.constant';
import { CacheManagerProvider } from './cache-manager.provider';
import { cacheManagerConfig } from './cache-manager.config';

const providers: Provider[] = [
  {
    useClass: CacheManagerProvider,
    provide: CACHE_MANAGER_PROVIDER,
  },
];

@Module({
  imports: [CacheModule.register(cacheManagerConfig)],
  providers: [...providers],
})
export class CacheManagerModule {}
