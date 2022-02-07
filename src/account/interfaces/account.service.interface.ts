import type { UpdateResult } from 'typeorm';
import type { CreateAccountDto, LoginAccountDto } from '../dto';
import type { AccountEntity } from '../entities';
import type { ICreateAccount } from './create-account.interface';
import type { IJwtData } from './jwt-data.interface';

export interface IAccountService {
  findAccountByLogin(login: string): Promise<AccountEntity | undefined>;
  validatePassword(password: string, hash: string): Promise<boolean>;
  updateAccountIp(id: number, ip: string): Promise<UpdateResult>;
  generateJwtToken(id: number): IJwtData;
  checkPasswordIsCorrect(accountId: number, password: string): Promise<boolean>;
  updatePassword(accountId: number, password: string): Promise<UpdateResult>;

  //---
  checkPasswordMatchAccountData(createAccountDto: CreateAccountDto): boolean;
  checkUsernameExist(username: string): Promise<boolean>;
  checkEmailExist(email: string): Promise<boolean>;
  checkPhoneNumberExist(phoneNumber: string): Promise<boolean>;
  // checkIsBanned(accountId: number): Promise<boolean>;
  // checkPasswordMeetsRequirements(password: string): Promise<string[]>;
  createAccount(accountData: ICreateAccount): Promise<AccountEntity>;
}
