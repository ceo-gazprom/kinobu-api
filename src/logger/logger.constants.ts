/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

export const LOGGER_SERVICE = Symbol('LOGGER_SERVICE');
export const LOGGER_CONFIG = Symbol('LOGGER_CONFIG');
