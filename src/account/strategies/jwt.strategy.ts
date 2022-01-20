import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONFIG, IJwtConfig } from '../../jwt';

// todo: refactoring change jwt service
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(JWT_CONFIG) private readonly jwtConfig: IJwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // todo: refactor it
      secretOrKey: jwtConfig.jwtAccessTokenSecret,
    });
  }

  public async validate(payload: { userId: number }) {
    return {
      userId: payload.userId,
    };
  }
}
