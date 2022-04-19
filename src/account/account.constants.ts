/**
 * DI constants
 * @author Robert Wacker
 *
 * @description Contains tokens for injection providers in the module,
 * controllers and services. Allows DI services to be used
 * through an interface for more flexibility.
 */

export const ACCOUNT_SERVICE = Symbol('ACCOUNT_SERVICE');
export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');
export const EMAIL_CONFIRM_CODE_REPOSITORY = Symbol(
  'EMAIL_CONFIRM_CODE_REPOSITORY',
);
export const JWT_STRATEGY = Symbol('JWT_STRATEGY');

export const PUBLIC_ROUTE_KEY = 'public_route';
