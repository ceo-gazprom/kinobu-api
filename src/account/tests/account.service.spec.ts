import { Test } from '@nestjs/testing';
import { EMAIL_SERVICE } from '../../email';
import { JWT_SERVICE } from '../../jwt';
import { AccountService } from '../account.service';
import {
  ACCOUNT_REPOSITORY,
  EMAIL_CONFIRM_CODE_REPOSITORY,
} from '../account.constants';

describe('The account service', () => {
  let accountService: AccountService;

  /** Init test module */
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: EMAIL_SERVICE,
          useValue: {
            method1: jest.fn(),
            method2: jest.fn(),
          },
        },
        {
          provide: JWT_SERVICE,
          useValue: {
            method1: jest.fn(),
            method2: jest.fn(),
          },
        },
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            findByLogin: () => true,
          },
        },
        {
          provide: EMAIL_CONFIRM_CODE_REPOSITORY,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    accountService = await module.get(AccountService);
  });

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get the user by email', async () => {
      const getMovieListSpy = jest.spyOn(accountService, 'findAccountByLogin');

      const login = 'username';
      await accountService.findAccountByLogin(login);

      expect(getMovieListSpy).toBeCalledTimes(1);
    });
  });
});
