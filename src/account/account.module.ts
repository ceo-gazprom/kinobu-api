import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';
import {
  AccountEntity,
  ReservedUsernameEntity,
  WorstPasswordEntity,
} from './entities';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';
import {
  ACCOUNT_SERVICE,
  JWT_SERVICE,
  ACCOUNT_REPOSITORY,
} from './account.constants';
import { AccountService } from './account.service';
import {} from './jwt.service';
import { EMAIL_PROVIDER, EmailProvider } from '../email';

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

const entities = [AccountEntity, ReservedUsernameEntity, WorstPasswordEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AccountController],
  providers: [JwtStrategy, ...providers],
})
export class AccountModule {}
