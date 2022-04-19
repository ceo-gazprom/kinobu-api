import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';
import { suite, test } from '@testdeck/jest';
import { EMAIL_SERVICE } from '../../email';
import { JWT_SERVICE } from '../../jwt';
import { AccountService } from '../account.service';
import {
  ACCOUNT_REPOSITORY,
  EMAIL_CONFIRM_CODE_REPOSITORY,
} from '../account.constants';


abstract class TestSuiteBaseWithContainer {
  public static container: TestingModule;

  static async beforeAll() {
    this.container = await Test.createTestingModule({
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
  }
}

@suite
class ConcreteTestSuite extends TestSuiteBaseWithContainer {
  async before() {
    this.accountService = TestSuiteBaseWithContainer.container.get<AccountService>(AccountService);
    // ...
  }
}

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get the user by email', async () => {
      const getMovieListSpy = jest.spyOn(accountService, 'findAccountByLogin');

      const login = 'username';
      await accountService.findAccountByLogin(login);

      expect(getMovieListSpy).toBeCalledTimes(1);
    });
  });
});
