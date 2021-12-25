import { IAbstractRepository } from '../../common/interfaces';
import type { AccountEntity } from '../entities';
import { ICreateAccount } from './create-account.interface';

export interface IAccountRepository extends IAbstractRepository<AccountEntity> {
  createAccount(createAccount: ICreateAccount): Promise<AccountEntity>;
  findByLogin(login: string): Promise<AccountEntity | undefined>;
}
