/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

export const USER_SERVICE = Symbol('USER_SERVICE');
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
