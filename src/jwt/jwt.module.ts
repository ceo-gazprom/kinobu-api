import { Module, Global } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { JWT_SERVICE, JWT_CONFIG, JWT_STRATEGY } from './jwt.constants';
import { JwtService } from './jwt.service';
import { JwtConfig } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';

const internalProviders: Provider[] = [
  {
    provide: JWT_CONFIG,
    useClass: JwtConfig,
  },
];

const externalProviders: Provider[] = [
  {
    provide: JWT_SERVICE,
    useClass: JwtService,
  },
  {
    provide: JWT_STRATEGY,
    useClass: JwtStrategy,
  },
];

@Global()
@Module({
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class JwtModule {}
