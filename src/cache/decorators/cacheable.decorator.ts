import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '../interceptors';

/**
 *
 * @returns
 */
export const Cacheable = () => UseInterceptors(CacheInterceptor);
