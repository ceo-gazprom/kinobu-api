import { Test, TestingModule } from '@nestjs/testing';
import type { Provider } from '@nestjs/common';
import { AccountController } from '../account.controller';
import { ACCOUNT_SERVICE } from '../di.constants';
import { AccountService } from '../account.service';
import { IAccountService } from '../interfaces';
import { EMAIL_PROVIDER } from '../../shared/providers/email';

/** 
 * Mocking injecting providers 
 */
const emailProvider: Provider = {
  provide: EMAIL_PROVIDER,
  useFactory: () => ({
    getGpa: jest.fn(() => 4.5),
  })
};

const injectingProviders: Provider[] = [emailProvider]

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;


  const accountRepository: Provider = null;
  const reservedUsernameRepository: Provider = null;
  const worstPasswordRepository: Provider = null;
  const jwtService: Provider = null;

  beforeEach(async () => {
    const accountServiceProvider: Provider = {
      provide: ACCOUNT_SERVICE,
      useClass: AccountService,
    }

  
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService, ...injectingProviders],
    }).compile();

    accountController = app.get<AccountController>(AccountController);
    accountService = app.get<AccountService>(ACCOUNT_SERVICE);
  });
  