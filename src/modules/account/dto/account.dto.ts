import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../entities';

export class AccountDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    example: '+79998887766',
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'username',
  })
  username: string;

  static fromEntity(accountEntity: AccountEntity): AccountDto {
    const account = new AccountDto();

    account.id = accountEntity.id;
    account.email = accountEntity.email;
    account.phoneNumber = accountEntity.phoneNumber;
    account.username = accountEntity.username;

    return account;
  }
}
