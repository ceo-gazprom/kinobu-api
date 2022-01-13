import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_SERVICE, IConfigService } from '../config';
import { IJwtConfig } from './interfaces';

@Injectable()
export class JwtConfig implements IJwtConfig {
  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigService,
  ) {}

  public get jwtAccessTokenSecret(): string {
    return this.configService.getString('JWT_ACCESS_TOKEN_SECRET');
  }

  public get jwtAccessTokenExpirationTime(): number {
    return this.configService.getNumber('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
  }

  public get jwtRefreshTokenSecret(): string {
    return this.configService.getString('JWT_REFRESH_TOKEN_SECRET');
  }

  public get jwtRefreshTokenExpirationTime(): number {
    return this.configService.getNumber('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }
}
