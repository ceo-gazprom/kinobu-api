/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

export const MOVIE_SERVICE = Symbol('MOVIE_SERVICE');
export const MOVIE_REPOSITORY = Symbol('MOVIE_REPOSITORY');
