import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { JWT_SERVICE, JWT_CONFIG } from './jwt.constants';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfig } from './jwt.config';

const providers: Provider[] = [
  {
    provide: JWT_SERVICE,
    useClass: JwtService,
  },
  {
    provide: JwtStrategy,
    useClass: JwtStrategy,
  },
  {
    provide: JWT_CONFIG,
    useClass: JwtConfig,
  },
];

@Module({
  providers: [...providers],
})
export class JwtModule {}
