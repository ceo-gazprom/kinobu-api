import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_SERVICE,
  ACCOUNT_REPOSITORY,
  EMAIL_CONFIRM_CODE_REPOSITORY,
  JWT_STRATEGY,
} from './account.constants';
import {
  AccountEntity,
  EmailConfirmCodeEntity,
  ReservedUsernameEntity,
  WorstPasswordEntity,
} from './entities';
import { EmailConfirmCodeRepository } from './repositories';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtStrategy } from './strategies';
import { EmailModule } from '../email';

const providers: Provider[] = [
  {
    provide: ACCOUNT_SERVICE,
    useClass: AccountService,
  },
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
  {
    provide: EMAIL_CONFIRM_CODE_REPOSITORY,
    useClass: EmailConfirmCodeRepository,
  },
  {
    provide: JWT_STRATEGY,
    useClass: JwtStrategy,
  },
];

const entities = [
  AccountEntity,
  EmailConfirmCodeEntity,
  ReservedUsernameEntity,
  WorstPasswordEntity,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities]),
    PassportModule,
    EmailModule,
  ],
  controllers: [AccountController],
  providers: [...providers],
})
export class AccountModule {}
