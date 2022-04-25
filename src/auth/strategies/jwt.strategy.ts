import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONFIG } from '../../jwt';
import type { IJwtConfig } from '../../jwt';

// todo: refactoring change jwt service
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(JWT_CONFIG) private readonly jwtConfig: IJwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.jwtAccessTokenSecret,
    });
  }

  public async validate(payload: { accountId: number }) {
    console.log(payload);
    return {
      userId: payload.accountId,
    };
  }
}
