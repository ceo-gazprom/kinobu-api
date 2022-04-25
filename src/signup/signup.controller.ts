import {
  Controller,
  Inject,
  Get,
  Post,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RequestIP } from '../common/decorators';
import { AccountDto } from '../account';
import { SIGNUP_SERVICE } from './signup.constants';
import { ISignupService } from './interfaces';
import { CreateAccountDto } from './dtos';
import {
  PasswordSameDataException,
  UsernameExistException,
  EmailExistException,
  PhoneNumberExistException,
} from './exceptions';

@Controller({
  version: '1',
  path: 'signup',
})
@ApiTags('SIGNUP')
export class SignupController {
  constructor(
    @Inject(SIGNUP_SERVICE) private readonly signupService: ISignupService,
  ) {}

  @Post('signup')
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
    if (this.signupService.checkPasswordMatchAccountData(createAccountDto)) {
      throw new PasswordSameDataException();
    }

    const { username, email, mobilePhone, password } = createAccountDto;
    /**
     * Check if such name is used
     */
    // if (await this.signupService.checkUsernameExist(username)) {
    //   throw new UsernameExistException();
    // }

    // /**
    //  * Check if such email is used
    //  */
    // if (await this.signupService.checkEmailExist(email)) {
    //   throw new EmailExistException();
    // }

    // /**
    //  * Check if such phone number is used
    //  * Todo: убрать проверку наличия телефона после реализации регистрации по email
    //  */
    // if (await this.signupService.checkPhoneNumberExist(mobilePhone)) {
    //   throw new PhoneNumberExistException();
    // }

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
    const newAccount = await this.signupService.registration(createAccountData);

    return new AccountDto(newAccount);
  }

  // Todo: если код уже отправлялся, сгенерировать новый
  // Todo: блокировать после 6 попыток
  // Todo: если код протух, отправить на страницу логина

  @Get('verify/:token')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async verifyEmail(@Param('token') token: string): Promise<void> {
    // return this.authService.login(authLoginDto);
  }

  @Get('resend-verification/:email')
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
}
