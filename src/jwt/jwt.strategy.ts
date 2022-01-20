import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// todo: refactoring change jwt service
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // todo: refactor it
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(payload: { userId: number }) {
    return {
      userId: payload.userId,
    };
  }
}
