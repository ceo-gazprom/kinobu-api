import type { AccountEntity } from '../entities';
import { ICreateAccount } from '../interfaces';

export interface IAccountRepository {
  createAccount(createAccount: ICreateAccount): Promise<AccountEntity>;
  findByLogin(login: string): Promise<AccountEntity>;
}
