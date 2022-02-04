import {
  IsOptional,
  IsEmail,
  IsAlphanumeric,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateAccount } from '../interfaces';

export class CreateAccountDto implements ICreateAccount {
  @IsEmail()
  @IsAlphanumeric()
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
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({
    required: true,
    example: 'username',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  @ApiProperty({
    required: true,
    example: '123password',
  })
  password: string;
}
