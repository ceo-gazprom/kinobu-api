import type { UpdateResult } from 'typeorm';
import type { CreateAccountDto, LoginAccountDto } from '../dto';
import type { AccountEntity } from '../entities';
import { IJwtData, ICreateAccount } from '.';

export interface IAccountService {
  findAccountByLogin(login: string): Promise<AccountEntity | undefined>;
  validatePassword(password: string, hash: string): Promise<boolean>;
  updateAccountIp(id: number, ip: string): Promise<UpdateResult>;
  generateJwtToken(id: number): IJwtData;

  //---
  checkPasswordMatchAccountData(createAccountDto: CreateAccountDto): boolean;
  checkUsernameExist(username: string): Promise<boolean>;
  checkEmailExist(email: string): Promise<boolean>;
  checkPhoneNumberExist(phoneNumber: string): Promise<boolean>;
  // checkPasswordMeetsRequirements(password: string): Promise<string[]>;
  createAccount(accountData: ICreateAccount): Promise<AccountEntity>;
}
