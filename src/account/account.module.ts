import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ACCOUNT_SERVICE, ACCOUNT_REPOSITORY } from './account.constants';
import { AccountEntity } from './entities';
import { AccountRepository } from './account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

const internalProviders: Provider[] = [
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
];

const externalProviders: Provider[] = [
  {
    provide: ACCOUNT_SERVICE,
    useClass: AccountService,
  },
];

const entities = [AccountEntity];

@Module({
  imports: [TypeOrmModule.forFeature([...entities]), PassportModule],
  controllers: [AccountController],
  providers: [...internalProviders, ...externalProviders],
  exports: [...externalProviders],
})
export class AccountModule {}
