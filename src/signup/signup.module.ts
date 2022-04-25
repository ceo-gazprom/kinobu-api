import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account';
import { EmailModule } from '../email';
import { SignupController } from './signup.controller';
import { SIGNUP_SERVICE } from './signup.constants';
import { SignupService } from './signup.services';
import {
  EmailConfirmCodeEntity,
  EmailDomainsBlacklistEntity,
} from './entities';

const providers: Provider[] = [
  {
    provide: SIGNUP_SERVICE,
    useClass: SignupService,
  },
];

const entities = [EmailConfirmCodeEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities]),
    AccountModule,
    EmailModule,
  ],
  controllers: [SignupController],
  providers: [...providers],
})
export class SignupModule {}
