import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { AccountModule } from '../account';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE, JWT_STRATEGY } from './auth.constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

const internalProviders: Provider[] = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: JWT_STRATEGY,
    useClass: JwtStrategy,
  },
];

@Module({
  imports: [AccountModule],
  controllers: [AuthController],
  providers: [...internalProviders],
})
export class AuthModule {}
