import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '../interceptors';
import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '../cache.constants';

/**
 *
 * @param key string naming the field to be used as a cache key
 * @param ttl
 * @returns
 */
export function Cacheable(key?: string, ttl?: number) {
  return applyDecorators(
    SetMetadata(CACHE_KEY_METADATA, key),
    SetMetadata(CACHE_TTL_METADATA, ttl),
    UseInterceptors(CacheInterceptor),
  );
}
