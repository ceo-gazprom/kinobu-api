import type { CreateAccountDto, LoginAccountDto } from './dto';
import type { AccountEntity } from './entities';
import { IJwtData, ICreateAccount } from './interfaces';

export interface IAccountService {
  login(loginAccountDto: LoginAccountDto, ip: string): Promise<IJwtData>;
  checkPasswordMatchAccountData(createAccountDto: CreateAccountDto): boolean;
  checkUsernameExist(username: string): Promise<boolean>;
  checkEmailExist(email: string): Promise<boolean>;
  checkPhoneNumberExist(phoneNumber: string): Promise<boolean>;
  // checkPasswordMeetsRequirements(password: string): Promise<string[]>;
  createAccount(accountData: ICreateAccount): Promise<AccountEntity>;
}
