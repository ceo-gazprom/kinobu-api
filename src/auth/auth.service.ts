import { Injectable, Inject } from '@nestjs/common';
import { ACCOUNT_SERVICE, IAccountService } from '../account';
import { JWT_SERVICE, IJwtService } from '../jwt';
import { IAuthService, IJwtDto } from './interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(ACCOUNT_SERVICE) private readonly accountService: IAccountService,
  ) {}

  public findAccountByLogin(login: string) {
    return this.accountService.findAccountByLogin(login);
  }

  public validatePassword(password: string, hash: string): Promise<boolean> {
    return this.accountService.validatePassword(password, hash);
  }

  public updateAccountIp(accountId: number, ip: string) {
    return this.accountService.updateAccountIp(accountId, ip);
  }

  /**
   *
   * @param {Number} id - account id
   * @returns jwt token
   */
  public generateJwtToken(accountId: number): IJwtDto {
    const accessToken = this.jwtService.getAccessToken(accountId);
    return {
      access_token: accessToken,
    };
  }

  public logout(): void {
    this.accountService;
  }
}
