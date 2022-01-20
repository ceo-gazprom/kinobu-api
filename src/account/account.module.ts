import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_SERVICE,
  ACCOUNT_REPOSITORY,
  JWT_STRATEGY,
} from './account.constants';
import {
  AccountEntity,
  ReservedUsernameEntity,
  WorstPasswordEntity,
} from './entities';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { EMAIL_PROVIDER, EmailProvider } from '../email';
import { JwtStrategy } from './strategies';

const providers: Provider[] = [
  {
    provide: ACCOUNT_SERVICE,
    useClass: AccountService,
  },
  {
    provide: EMAIL_PROVIDER,
    useClass: EmailProvider,
  },
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
  {
    provide: JWT_STRATEGY,
    useClass: JwtStrategy,
  },
];

const entities = [AccountEntity, ReservedUsernameEntity, WorstPasswordEntity];

@Module({
  imports: [TypeOrmModule.forFeature([...entities]), PassportModule],
  controllers: [AccountController],
  providers: [...providers],
})
export class AccountModule {}
