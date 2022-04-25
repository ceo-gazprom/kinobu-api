/**
 * Account module
 * @module app/account
 * @description The exported module includes the logic for working with the account entity.
 */
export { AccountModule } from './account.module';

/**
 * Account DTO
 * @description Used in other modules to generate the method response description
 * in the swagger documentation. It is not possible to use interfaces at the moment.
 */
export { AccountDto } from './dtos';

/**
 * Account service token
 * @description Token to inject the service into other providers.
 */
export { ACCOUNT_SERVICE } from './account.constants';

/**
 * Account service interface
 * @description Service interface that describes the injected service,
 * for less coupling of code parts
 */
export type { IAccountService } from './interfaces';

export type { IAccountEntity } from './interfaces';
