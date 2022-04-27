import {
  Controller,
  Inject,
  Post,
  Body,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RequestIP } from '../core/decorators';
import { AUTH_SERVICE } from './auth.constants';
import { JwtDto, SigninDto } from './dtos';
import {
  AccountNotFoundException,
  IncorrectPasswordException,
} from './exceptions';
import type { IAuthService, IJwtDto } from './interfaces';
import { UserAgent } from './decorators';

@ApiTags('AUTH')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  // Todo: присылать письмо, если вход с подозрительного ip адресса
  // Todo: написать модуль для геоплагина и определения ip для nest
  // Todo: Проверить подтвержден ли email
  @Post('signin')
  @ApiResponse({
    status: HttpStatus.OK,
    type: JwtDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: AccountNotFoundException,
  })
  public async signIn(
    @RequestIP() ipAdress: string,
    @UserAgent() userAgent: string,
    @Body() signinDto: SigninDto,
  ): Promise<IJwtDto> {
    const { login, password } = signinDto;

    console.log(userAgent);
    console.log(ipAdress);
    /**
     * We check that an account with this login exists
     */
    const account = await this.authService.findAccountByLogin(login);
    if (!account) throw new AccountNotFoundException();

    /**
     * Checking that the password is correct
     */
    const validation = await this.authService.validatePassword(
      password,
      account.password,
    );
    if (!validation) throw new IncorrectPasswordException();

    await this.authService.updateAccountIp(account.id, ipAdress);

    const token = this.authService.generateJwtToken(account.id);

    return new JwtDto(token);
  }

  // @Get('logut')
  // public async logout(): Promise<void> {
  //   await this.authService.logout();
  // }

  // Todo: logout all and logout from specific device only
  // @Get('logout/all')
  // public async logoutAll(): Promise<void> {
  //   await this.authService.logoutFromAllDevices();
  // }

  // @Get('logout/:id')
  // public async logoutAll(): Promise<void> {
  //   await this.authService.logoutFromDeviceById();
  // }
}
