/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */
export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
export const JWT_STRATEGY = Symbol('JWT_STRATEGY');

export const PUBLIC_ROUTE_KEY = 'public_route';
