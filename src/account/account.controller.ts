import {
  Controller,
  Inject,
  Logger,
  Get,
  Post,
  HttpStatus,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthAccount } from '../auth';
import { AccountDto, ChangePasswordAccountDto } from './dtos';
import { ACCOUNT_SERVICE } from './account.constants';
import type { IAccountService, IAccountEntity } from './interfaces';

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

  // @Get('me')
  // // @Auth([RoleType.USER, RoleType.ADMIN])
  // @ApiResponse({ type: AccountDto, description: 'current account info' })
  // public getCurrentUser(): // @AuthAccount() accountEntity: IAccountEntity,
  // AccountDto {
  //   // return new AccountDto(accountEntity);
  // }

  @Post('change-password')
  // @Auth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  public async changePassword(
    @Body() changePasswordAccountDto: ChangePasswordAccountDto,
  ): Promise<void> {
    /**
     * Verify that the old password is correct for the specified id
     */
    const checkResult = this.accountService.checkPasswordIsCorrect(
      changePasswordAccountDto.accountId,
      changePasswordAccountDto.oldPassword,
    );

    if (!checkResult) throw new BadRequestException();

    await this.accountService.updatePassword(
      changePasswordAccountDto.accountId,
      changePasswordAccountDto.newPassword,
    );
  }
}
