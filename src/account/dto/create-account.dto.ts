import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateAccount } from '../interfaces';

export class CreateAccountDto implements ICreateAccount {
  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'example@example.com',
  })
  email: string;

  // Todo: Активировать при интеграции с сервисом отправки СМС
  @ApiProperty({
    required: false,
    example: '+79998887766',
  })
  @IsOptional()
  mobilePhone: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'username',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123password',
  })
  password: string;
}
