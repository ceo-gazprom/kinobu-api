import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';
import { ReservedUsernameEntity, WorstPasswordEntity } from './entities';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';
import {
  ACCOUNT_SERVICE,
  JWT_SERVICE,
  ACCOUNT_REPOSITORY,
} from './di.constants';
import { AccountService } from './account.service';
import {} from './jwt.service';
import { EMAIL_PROVIDER, EmailProvider } from '../../shared/providers/email';
import { AccountRepository } from './account.repository';

const providers: Provider[] = [
  {
    useClass: AccountService,
    provide: ACCOUNT_SERVICE,
  },
  {
    useClass: EmailProvider,
    provide: EMAIL_PROVIDER,
  },
  {
    useClass: AccountRepository,
    provide: ACCOUNT_REPOSITORY,
  },
];

const entities = [ReservedUsernameEntity, WorstPasswordEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository, ...entities]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AccountController],
  providers: [JwtStrategy, ...providers],
})
export class AccountModule {}
