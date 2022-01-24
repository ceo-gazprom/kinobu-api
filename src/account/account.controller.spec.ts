import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { ACCOUNT_SERVICE } from './account.constants';

describe('Account Controller', () => {
  let module: TestingModule;
  let controller: AccountController;

  /**
   * Mock data
   */
  const mockEmail = 'example@example.com';
  const mockPassword = '123password';

  const mockAuthService: Partial<AuthService> = {
    login: jest.fn(async (payLoad): Promise<LoginResponseVm> => {
      return mockLoginResponse;
    }),
    logoutFromAll: jest.fn(),
    logout: jest.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: ACCOUNT_SERVICE,
          useValue: mockAuthService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        MapperService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
