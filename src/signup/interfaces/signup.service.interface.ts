import type { ICreateAccountDto } from './dto';

export interface ISignupService {
  registration(createAccountDto: ICreateAccountDto): any;
  checkPasswordMatchAccountData(createAccountDto: ICreateAccountDto): boolean;
}
