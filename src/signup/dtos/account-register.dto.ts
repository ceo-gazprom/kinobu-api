import {
  IsOptional,
  IsEmail,
  IsAlphanumeric,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from '../../core/decorators';
import type { ICreateAccountDto } from '../interfaces';

export class CreateAccountDto implements ICreateAccountDto {
  // todo: добавить исключение русских букв
  // todo: привести к нижнему регистру
  @IsEmail()
  @Trim()
  @ApiProperty({
    required: true,
    example: 'example@example.com',
  })
  email: string;

  // Todo: Активировать при интеграции с сервисом отправки СМС
  @Trim()
  @ApiProperty({
    required: false,
    example: '+79998887766',
  })
  @IsOptional()
  mobilePhone: string;

  @IsNotEmpty()
  @Trim()
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({
    required: true,
    example: 'username',
  })
  username: string;

  @IsNotEmpty()
  @Trim()
  @MinLength(6)
  @MaxLength(60)
  @ApiProperty({
    required: true,
    example: '123password',
  })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({
    required: false,
    example: '+79998887766',
  })
  phoneNumber: string;
}
