import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../entities';

export class AccountDto {
  @ApiProperty({
    example: 1,
  })
  public id: string;

  @ApiProperty({
    example: 'example@example.com',
  })
  public email: string;

  @ApiProperty({
    example: '+79998887766',
  })
  public phoneNumber: string;

  @ApiProperty({
    example: 'username',
  })
  public username: string;

  constructor(accountEntity: AccountEntity) {
    this.id = accountEntity.id;
    this.email = accountEntity.email;
    this.phoneNumber = accountEntity.phoneNumber;
    this.username = accountEntity.username;
  }
}
