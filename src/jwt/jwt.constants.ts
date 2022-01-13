export const JWT_SERVICE = Symbol('JWT_SERVICE');
export const JWT_STRATEGY = Symbol('JWT_STRATEGY');
/**
 * @nestjs/config registerAs method does not allow setting token symbol type
 */
export const JWT_CONFIG = 'JWT_CONFIG';
