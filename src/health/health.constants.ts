/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

/**
 * Health service injection token from the terminus package
 */
export const HEALTH_CHECKER_SERVICE = Symbol('HEALTH_CHECKER_SERVICE');

/**
 * Indicator provider injection tokens
 */
export const DISK_HEALTH_INDICATOR = Symbol('DISK_HEALTH_INDICATOR');
export const MEMORY_HEALTH_INDICATOR = Symbol('MEMORY_HEALTH_INDICATOR');
export const TYPEORM_HEALTH_INDICATOR = Symbol('TYPEORM_HEALTH_INDICATOR');
