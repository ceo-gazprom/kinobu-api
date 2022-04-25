import type { UpdateResult } from 'typeorm';
import type { IAccountEntity } from './entities';
import type { ICreateAccount } from './create-account.interface';

export interface IAccountService {
  findAccountByLogin(login: string): Promise<IAccountEntity | undefined>;
  validatePassword(password: string, hash: string): Promise<boolean>;
  updateAccountIp(id: number, ip: string): Promise<UpdateResult>;
  checkPasswordIsCorrect(accountId: number, password: string): Promise<boolean>;
  updatePassword(accountId: number, password: string): Promise<UpdateResult>;

  //---
  checkUsernameExist(username: string): Promise<boolean>;
  checkEmailExist(email: string): Promise<boolean>;
  checkPhoneNumberExist(phoneNumber: string): Promise<boolean>;
  // checkIsBanned(accountId: number): Promise<boolean>;
  // checkPasswordMeetsRequirements(password: string): Promise<string[]>;
  createAccount(accountData: ICreateAccount): Promise<IAccountEntity>;
}
