import type { IJwtDto } from './jwt.dto.interface';

export interface IAuthService {
  findAccountByLogin(login: string): Promise<any>;
  validatePassword(password: string, hash: string): Promise<boolean>;
  updateAccountIp(accountId: number, ip: string): Promise<any>;
  generateJwtToken(accountId: number): IJwtDto;
  // logout(): Promise<void>;
}
