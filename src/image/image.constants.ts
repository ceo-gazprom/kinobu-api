/**
 * DI constants
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

export const IMAGE_SERVICE = Symbol('IMAGE_SERVICE');

export const allowImageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/bmp',
];

/**
 * Size in megabytes
 */
export const maxImageSize = 10;
