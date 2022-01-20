import { Injectable, Inject, Logger } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import type {
  IJwtService,
  IJwtTokenPayload,
  IJwtConfig,
  IRefreshTokenRepository,
} from './interfaces';
import { JWT_CONFIG, REFRESH_TOKEN_REPOSITORY } from './jwt.constants';

@Injectable()
export class JwtService implements IJwtService {
  private readonly logger = new Logger(JwtService.name);

  constructor(
    @Inject(JWT_CONFIG) private readonly jwtConfig: IJwtConfig,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  /**
   *
   * @param accountId
   */
  public getAccessToken(accountId: number): string {
    const payload: IJwtTokenPayload = { accountId };
    return this.generateAccessToken(payload);
  }

  /**
   *
   * @param accountId
   */
  public getRefreshToken(accountId: number): string {
    const payload: IJwtTokenPayload = { accountId };
    return this.generateRefreshToken(payload);
  }

  public verifyAccessToken(token: string): IJwtTokenPayload {
    return <IJwtTokenPayload>verify(token, this.jwtConfig.jwtAccessTokenSecret);
  }
  public verifyRefreshToken(token: string): IJwtTokenPayload {
    return <IJwtTokenPayload>(
      verify(token, this.jwtConfig.jwtRefreshTokenSecret)
    );
  }

  /**
   *
   */
  private generateAccessToken(payload: IJwtTokenPayload): string {
    return sign(payload, this.jwtConfig.jwtAccessTokenSecret, {
      algorithm: 'HS256',
      expiresIn: this.jwtConfig.jwtAccessTokenExpirationTime,
    });
  }

  private generateRefreshToken(payload: IJwtTokenPayload): string {
    return sign(payload, this.jwtConfig.jwtRefreshTokenSecret, {
      algorithm: 'HS256',
      expiresIn: this.jwtConfig.jwtRefreshTokenExpirationTime,
    });
  }
}
