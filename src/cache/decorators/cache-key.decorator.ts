import { SetMetadata } from '@nestjs/common';
import { CACHE_KEY_METADATA } from '../cache.constants';

/**
 *
 * @param key @param key string naming the field to be used as a cache key
 * @returns
 */
export const CacheKey = (key: string) => SetMetadata(CACHE_KEY_METADATA, key);
