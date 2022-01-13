import {
  Controller,
  Inject,
  Logger,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RequestIP } from './decorators';
import { ResponseErrorDto } from '../common/dto';
import { LoginAccountDto, CreateAccountDto, AccountDto } from './dto';
import {
  PasswordSameDataExceptionFilter,
  IncorrectPasswordExceptionFilter,
  UsernameExistExceptionFilter,
  EmailExistExceptionFilter,
  PhoneNumberExistExceptionFilter,
  PasswordNotMeetRequirementExceptionFilter,
  UserNotFoundExceptionFilter,
} from './filters';
import { ACCOUNT_SERVICE } from './account.constants';
import { IAccountService } from './interfaces';
import { IJwtData } from './interfaces';

@Controller({
  version: '1',
  path: 'account',
})
@ApiTags('ACCOUNT')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly accountService: IAccountService,
  ) {}

  // Todo: присылать письмо, если вход с подозрительного ip адресса
  // Todo: написать модуль для геоплагина и определения ip для nest
  // Todo: Проверить подтвержден ли email
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async signIn(
    @RequestIP() ip: string,
    @Body() loginAccountDto: LoginAccountDto,
  ): Promise<IJwtData> {
    const { login, password } = loginAccountDto;

    /**
     * We check that an account with this login exists
     */
    const account = await this.accountService.findAccountByLogin(login);
    if (!account) throw new UserNotFoundExceptionFilter();

    /**
     * Checking that the password is correct
     */
    const validation = await this.accountService.validatePassword(
      password,
      account.password,
    );
    if (!validation) throw new IncorrectPasswordExceptionFilter();

    await this.accountService.updateAccountIp(account.id, ip);

    return this.accountService.generateJwtToken(account.id);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create a new account',
    type: AccountDto,
  })
  public async signUp(
    @RequestIP() ip: string,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountDto> {
    /**
     * Check if the password matches other account data
     */
    if (this.accountService.checkPasswordMatchAccountData(createAccountDto)) {
      throw new PasswordSameDataExceptionFilter();
    }

    const { username, email, mobilePhone, password } = createAccountDto;
    /**
     * Check if such name is used
     */
    if (await this.accountService.checkUsernameExist(username)) {
      throw new UsernameExistExceptionFilter();
    }

    /**
     * Check if such email is used
     */
    if (await this.accountService.checkEmailExist(email)) {
      throw new EmailExistExceptionFilter();
    }

    /**
     * Check if such phone number is used
     * Todo: убрать проверку наличия телефона после реализации регистрации по email
     */
    if (await this.accountService.checkPhoneNumberExist(mobilePhone)) {
      throw new PhoneNumberExistExceptionFilter();
    }

    // /**
    //  * Check if the password matches the requirement
    //  */
    // const checkPasswordResult =
    //   await this.accountService.checkPasswordMeetsRequirements(password);
    // if (checkPasswordResult.length > 0) {
    //   throw new PasswordNotMeetRequirementExceptionFilter(checkPasswordResult);
    // }

    const createAccountData = { ip, ...createAccountDto };
    /**
     * Create new account
     */
    const newAccount = await this.accountService.createAccount(
      createAccountData,
    );
    return AccountDto.fromEntity(newAccount);
  }

  // Todo: если код уже отправлялся, сгенерировать новый
  // Todo: блокировать после 6 попыток
  // Todo: если код протух, отправить на страницу логина

  @Get('email/verify/:token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async verifyEmail(@Param('token') token: string): Promise<void> {
    // return this.authService.login(authLoginDto);
  }

  @Get('email/resend-verification/:email')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async resendConfirmEmail(
    @Param('email') email: string,
  ): Promise<void> {
    // return this.authService.login(authLoginDto);
  }

  // Todo: @Get('email/forgot-password/:email')
  // Todo: @Post('email/reset-password')

  //     @Post('register')
  // public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {
  //     const result:
  //     RegistrationStatus = await this.authService.register(createUserDto,);
  //     if (!result.success) {
  //         throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
  //     }
  //     return result;
  // }
  //   }
}
