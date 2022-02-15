/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

export const CACHE_SERVICE = Symbol('CACHE_SERVICE');
export const CACHE_CONFIG = Symbol('CACHE_CONFIG');
export const CACHE_DRIVER = Symbol('CACHE_DRIVER');

/**
 * Metadata keys for reflection
 */
export const CACHE_KEY_METADATA = 'cache:cache_key';
export const CACHE_TTL_METADATA = 'cache:cache_ttl';

/**
 * Ready cache time to live options are more readable
 */
export enum CacheTtlSeconds {
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}
